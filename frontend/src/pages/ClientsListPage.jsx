// Página de listagem de clientes
import React, { useEffect, useState } from 'react';
import Table from '../components/Table.jsx';
import { api } from '../services/api';

export default function ClientsListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true); setError(null);
    try { const { data } = await api.get('/clientes'); setData(data); }
    catch (e) { setError(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'razaoSocial', label: 'Razão Social' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'telefone', label: 'Telefone' },
  ];

  return (
    <div className="section">
      <h2>Clientes</h2>
      <div className="actions">
        {!loading && <button className="button secondary" onClick={load}>Recarregar</button>}
      </div>
      {loading && <div className="card">Carregando...</div>}
      {error && <div className="card">Erro ao carregar: {String(error)}</div>}
      <Table columns={columns} data={data} />
    </div>
  );
}
