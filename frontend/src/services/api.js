// Configura instância Axios para comunicação com o backend
import axios from 'axios';

// Lê URL da API via variável de ambiente do Vite
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({ baseURL });

// Exemplo de chamada para buscar produtos
export async function fetchProdutos() {
  const { data } = await api.get('/produtos');
  return data;
}

export async function fetchCampanhas() {
  const { data } = await api.get('/campanhas');
  return data;
}
