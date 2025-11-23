// Página de cadastro de pedidos
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

export default function OrderCreatePage() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState({ clienteId: '', vendedorId: '', itens: [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [vendedores, setVendedores] = useState([]);

  const defaultNumero = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    return `P-${stamp}`;
  }, []);

  useEffect(() => {
    async function load() {
      const [cli, pro, vend] = await Promise.all([
        api.get('/clientes').then((r) => r.data),
        api.get('/produtos').then((r) => r.data),
        api.get('/funcionarios').then((r) => r.data),
      ]);
      setClientes(cli); setProdutos(pro); setVendedores(vend);
    }
    load();
  }, []);

  function addItem() {
    setPedido((p) => ({ ...p, itens: [...p.itens, { produtoId: '', quantidade: 1, precoUnitario: 0 }] }));
  }
  function updateItem(idx, field, value) {
    setPedido((p) => ({ ...p, itens: p.itens.map((it, i) => i === idx ? { ...it, [field]: value } : it) }));
  }
  function removeItem(idx) {
    setPedido((p) => ({ ...p, itens: p.itens.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError(null);
    try {
      const payload = {
        numeroPedido: String(pedido.numeroPedido || defaultNumero),
        clienteId: Number(pedido.clienteId),
        vendedorId: pedido.vendedorId ? Number(pedido.vendedorId) : null,
        itens: pedido.itens.map((i) => ({ produtoId: Number(i.produtoId), quantidade: Number(i.quantidade), precoUnitario: Number(i.precoUnitario) })),
      };
      await api.post('/pedidos', payload);
      alert('Pedido cadastrado!');
      setPedido({ clienteId: '', vendedorId: '', itens: [] });
    } catch (e) { setError(e); }
    finally { setSaving(false); }
  }

  return (
    <div className="section">
      <h2>Cadastrar Pedido</h2>
      <form onSubmit={handleSubmit} className="form card">
        <label>
          Número do Pedido
          <input className="input" type="text" value={pedido.numeroPedido ?? ''} onChange={(e) => setPedido((p) => ({ ...p, numeroPedido: e.target.value }))} placeholder={defaultNumero} />
        </label>

        <label>
          Vendedor
          <select className="select" value={pedido.vendedorId || ''} onChange={(e) => setPedido((p) => ({ ...p, vendedorId: e.target.value }))}>
            <option value="">Selecione</option>
            {vendedores.map((v) => (<option key={v.id} value={v.id}>{v.nome}</option>))}
          </select>
        </label>

        <label>
          Cliente
          <select className="select" value={pedido.clienteId} onChange={(e) => setPedido((p) => ({ ...p, clienteId: e.target.value }))} required>
            <option value="">Selecione</option>
            {clientes.map((c) => (<option key={c.id} value={c.id}>{c.razaoSocial || c.nome}</option>))}
          </select>
        </label>

        <div className="section">
          <h3>Itens</h3>
          <div className="actions"><button className="button secondary" type="button" onClick={addItem}>Adicionar Item</button></div>
          {pedido.itens.map((it, idx) => (
            <div key={idx} className="row" style={{ marginTop: 6 }}>
              <select className="select" value={it.produtoId} onChange={(e) => updateItem(idx, 'produtoId', e.target.value)} required>
                <option value="">Produto</option>
                {produtos.map((p) => (<option key={p.id} value={p.id}>{p.nome}</option>))}
              </select>
              <input className="input" type="number" min="1" value={it.quantidade} onChange={(e) => updateItem(idx, 'quantidade', e.target.value)} placeholder="Qtd" required />
              <input className="input" type="number" step="0.01" value={it.precoUnitario} onChange={(e) => updateItem(idx, 'precoUnitario', e.target.value)} placeholder="Preço" required />
              <button className="button secondary" type="button" onClick={() => removeItem(idx)}>Remover</button>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="button" type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Pedido'}</button>
        </div>
        {error && <div className="card">Erro ao salvar: {String(error.message || error)}</div>}
      </form>
    </div>
  );
}
