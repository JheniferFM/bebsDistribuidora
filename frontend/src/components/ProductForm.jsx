// Formulário de cadastro de produto
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function ProductForm({ onSaved }) {
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', embalagemIds: [], unidadeProducaoIds: [] });
  const [embalagens, setEmbalagens] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      const [emb, uni] = await Promise.all([
        api.get('/embalagens').then((r) => r.data),
        api.get('/unidades-producao').then((r) => r.data),
      ]);
      setEmbalagens(emb);
      setUnidades(uni);
    }
    loadOptions();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { nome: form.nome, descricao: form.descricao, preco: Number(form.preco), embalagemIds: form.embalagemIds.map((x) => Number(x)), unidadeProducaoIds: form.unidadeProducaoIds.map((x) => Number(x)) };
      await api.post('/produtos', payload);
      onSaved && onSaved();
      setForm({ nome: '', descricao: '', preco: '', embalagemIds: [], unidadeProducaoIds: [] });
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="form card" style={{ width: '100%' }}>
      <label>
        Nome
        <input className="input" name="nome" value={form.nome} onChange={handleChange} required />
      </label>
      <label>
        Descrição
        <textarea className="textarea" name="descricao" value={form.descricao} onChange={handleChange} />
      </label>
      <label>
        Preço
        <input className="input" name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} required />
      </label>
      <label>
        Embalagens
        <select className="select" name="embalagemIds" multiple value={form.embalagemIds} onChange={(e) => setForm((f) => ({ ...f, embalagemIds: Array.from(e.target.selectedOptions).map((o) => o.value) }))} required>
          {embalagens.map((e) => (<option key={e.id} value={e.id}>{e.nome} • {e.volume}{e.unidadeVolume}</option>))}
        </select>
      </label>
      <label>
        Unidades de Produção
        <select className="select" name="unidadeProducaoIds" multiple value={form.unidadeProducaoIds} onChange={(e) => setForm((f) => ({ ...f, unidadeProducaoIds: Array.from(e.target.selectedOptions).map((o) => o.value) }))} required>
          {unidades.map((u) => (<option key={u.id} value={u.id}>{u.nome}</option>))}
        </select>
      </label>
      <div className="actions">
        <button className="button" type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
        <button className="button secondary" type="button" onClick={() => setForm({ nome: '', descricao: '', preco: '', embalagemIds: [], unidadeProducaoIds: [] })}>Limpar</button>
      </div>
    </form>
  );
}
