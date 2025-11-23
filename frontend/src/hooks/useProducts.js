// Hook para buscar e gerenciar lista de produtos
import { useEffect, useState } from 'react';
import { fetchProdutos } from '../services/api';

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true); setError(null);
    try { setData(await fetchProdutos()); } catch (e) { setError(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return { data, loading, error, reload: load };
}

