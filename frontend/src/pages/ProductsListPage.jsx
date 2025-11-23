// Página de listagem de produtos
import React, { useMemo } from 'react';
import Table from '../components/Table.jsx';
import { useProducts } from '../hooks/useProducts';
import { api } from '../services/api';

export default function ProductsListPage() {
  const { data, loading, error, reload } = useProducts();

  function svgThumb(text, w = 600, h = 400, c1 = '#1b2130', c2 = '#0f1115') {
    const svg = `<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>\n<defs>\n<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient>\n</defs>\n<rect width='100%' height='100%' fill='url(#g)'/>\n<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e6eaf2' font-size='32' font-family='system-ui, -apple-system, Segoe UI'>${text}</text>\n</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  const productImages = useMemo(() => ({
    'Cerveja Branca': '/images/cerveja_branca.svg',
    'Cerveja Escura': '/images/cerveja_escura.svg',
    'Guaraná Normal': '/images/guarananormal.png',
    'Guaraná Light': '/images/GuaranáLight.png',
    'Água mineral com gás': '/images/agua.png',
    'Água mineral sem gás': '/images/aguasemgas.png',
    'Heineken': '/images/Heineken.jpg',
    'Stella Artois': '/images/StellaArtois.jpg',
    'Corona': '/images/Corona.jpg',
    "Johnnie Walker Black Label": '/images/JohnnieWalkerBlackLabel.jpg',
    "Johnnie Walker Gold Label": '/images/JohnnieWalkerGoldLabel.jpg',
    'Chivas Regal 12 anos': '/images/ChivasRegal12.jpg',
    "Jack Daniel's": "/images/JackDaniel's.jpg",
    'Absolut': '/images/Absolut.jpg',
    'Cîroc': svgThumb('Cîroc', 600, 400, '#1e90ff', '#12151c'),
    'Grey Goose': svgThumb('Grey Goose', 600, 400, '#2a3140', '#0f1115'),
    'Gin Tanqueray': svgThumb('Tanqueray', 600, 400, '#2f6e59', '#12151c'),
    'Gin Bombay Sapphire': svgThumb('Bombay', 600, 400, '#1e90ff', '#12151c'),
    'Tequila José Cuervo Gold': svgThumb('Cuervo Gold', 600, 400, '#caa64b', '#12151c'),
    'Tequila Patrón Silver': svgThumb('Patrón Silver', 600, 400, '#a7b0c0', '#12151c'),
    'Baileys': svgThumb('Baileys', 600, 400, '#5d4037', '#3e2723'),
    'Red Bull 250ml': '/images/3401-energetico-red-bull-energy-drink-250ml.jpg',
    'Red Bull 473ml': svgThumb('Red Bull 473ml', 600, 400, '#1e90ff', '#12151c'),
    'Monster Energy': '/images/monster.jpg',
    'Vibe Energy Drink': svgThumb('Vibe Energy', 600, 400, '#3aa17e', '#1d2432'),
    'Coca-Cola': '/images/Coca-Cola.jpg',
    default: svgThumb('Bebs Distribuidora', 600, 400, '#1b2130', '#0f1115'),
  }), []);

  function slugify(name) {
    return name
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  function imageCandidates(name) {
    const s = slugify(name);
    return [`/images/${s}.png`, `/images/${s}.jpg`, `/images/${s}.jpeg`, `/images/${s}.svg`];
  }
  function imageSrc(name) { return imageCandidates(name)[0]; }
  function makeOnError(cands) {
    let i = 0;
    return (e) => {
      i++;
      if (i < cands.length) { e.currentTarget.src = cands[i]; }
      else { e.currentTarget.style.display = 'none'; }
    };
  }

  const columns = [
    { key: 'imagem', label: 'Imagem', render: (_, row) => (
      <img
        className="product-thumb"
        src={productImages[row.nome] || imageSrc(row.nome) || productImages.default}
        alt={row.nome}
        onError={makeOnError(imageCandidates(row.nome))}
      />
    ) },
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'preco', label: 'Preço' },
    { key: 'embalagens', label: 'Embalagens', render: (_, row) => (row.embalagens || []).length ? (row.embalagens.map((e) => `${e.nome} ${e.volume}${e.unidadeVolume}`).join(', ')) : '-' },
    { key: 'unidadesProducao', label: 'Unidades', render: (_, row) => (row.unidadesProducao || []).length ? (row.unidadesProducao.map((u) => u.nome).join(', ')) : '-' },
    { key: 'acoes', label: 'Ações', render: (_, row) => (
      <button className="button secondary" onClick={async () => { await api.delete(`/produtos/${row.id}`); reload(); }}>Excluir</button>
    ) },
  ];

  return (
    <div className="section">
      <h2>Produtos</h2>
      <div className="actions">
        {!loading && <button className="button secondary" onClick={reload}>Recarregar</button>}
      </div>
      {loading && <div className="card">Carregando...</div>}
      {error && <div className="card">Erro ao carregar: {String(error)}</div>}
      <Table columns={columns} data={data} />
    </div>
  );
}
