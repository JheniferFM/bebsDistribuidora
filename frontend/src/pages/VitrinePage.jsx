import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCampanhas, fetchProdutos } from '../services/api';
 

export default function VitrinePage() {
  const [campanhas, setCampanhas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [camps, prods] = await Promise.all([fetchCampanhas(), fetchProdutos()]);
        setCampanhas(camps);
        setProdutos(prods);
      } catch (e) { setError(e); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  function svgBanner(text, w = 1200, h = 320, c1 = '#1b2130', c2 = '#0f1115') {
    const svg = `<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>\n<defs>\n<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient>\n</defs>\n<rect width='100%' height='100%' fill='url(#g)'/>\n<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e6eaf2' font-size='44' font-family='system-ui, -apple-system, Segoe UI'>${text}</text>\n</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  function svgThumb(text, w = 600, h = 400, c1 = '#3aa17e', c2 = '#1d2432') {
    const svg = `<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>\n<defs>\n<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient>\n</defs>\n<rect width='100%' height='100%' fill='url(#g)'/>\n<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e6eaf2' font-size='36' font-family='system-ui, -apple-system, Segoe UI'>${text}</text>\n</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const productImages = useMemo(() => ({
    'Cerveja Branca': '/images/cerveja_branca.svg',
    'Cerveja Escura': '/images/cerveja_escura.svg',
    'Guaraná Normal': '/images/guarananormal.png',
    'Guarana Normal': '/images/guarananormal.png',
    'Guaraná Light': '/images/GuaranáLight.png',
    'Guarana Light': '/images/GuaranáLight.png',
    'Água mineral com gás': '/images/agua.png',
    'Água mineral sem gás': '/images/aguasemgas.png',
    'Água com gás': '/images/agua.png',
    'Agua com gas': '/images/agua.png',
    'Água sem gás': '/images/aguasemgas.png',
    'Agua sem gas': '/images/aguasemgas.png',
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
  function makeOnError(cands) {
    let i = 0;
    return (e) => {
      i++;
      if (i < cands.length) { e.currentTarget.src = cands[i]; }
      else { e.currentTarget.src = productImages.default; }
    };
  }
  function imageSrc(name) { return imageCandidates(name)[0]; }

  const topProdutos = useMemo(() => produtos.filter(p => p.nome !== 'Cerveja Branca' && p.nome !== 'Cerveja Escura').slice(0, 12), [produtos]);
  const whatsappLink = useMemo(() => {
    const phone = '5500000000000';
    const text = encodeURIComponent('Olá, quero saber mais sobre as promoções da Bebs Distribuidora!');
    return `https://wa.me/${phone}?text=${text}`;
  }, []);
  const orderedCampanhas = useMemo(() => {
    const prio = { 'Verão Refrescante': 0, 'Clássicos BeboSim': 1 };
    return [...campanhas].sort((a, b) => (prio[a?.nome] ?? 2) - (prio[b?.nome] ?? 2));
  }, [campanhas]);

  return (
    <div className="section">
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <img src="/images/banner.png" alt="Bebs Distribuidora" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
      </div>

      <div className="hero card" style={{ padding: 28 }}>
        <h1 className="hero-title">Bebs Distribuidora • Sabor que conecta</h1>
        <p className="hero-sub">Conheça nossas promoções e catálogos. Fale conosco pelo WhatsApp.</p>
        <div className="actions">
          <a className="button" href={whatsappLink} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          <Link className="button secondary" to="/produtos">Ver Produtos</Link>
        </div>
      </div>

      <div className="section">
        <h2>Promoções</h2>
        {loading && <div className="card">Carregando promos...</div>}
        {error && <div className="card">Erro ao carregar promoções: {String(error.message || error)}</div>}
        {!loading && !campanhas.length && !error && (
          <div className="card promo-empty">Nenhuma promoção ativa. Fique de olho nas próximas campanhas!</div>
        )}
        {!!campanhas.length && (
          <div className="promo-stack">
            {orderedCampanhas.map((camp) => (
              <div key={camp.id} className="promo-card card">
                <div style={{ textAlign: 'center' }}>
                  <strong style={{ fontSize: 20 }}>{camp.nome}</strong>
                  <div style={{ color: 'var(--muted)', marginTop: 4 }}>{new Date(camp.inicio).toLocaleDateString()} • {new Date(camp.fim).toLocaleDateString()}</div>
                </div>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>{camp.descricao || 'Campanha especial Bebs Distribuidora'}</p>
                <div className="catalog-grid catalog-four">
                  {(camp.produtos || []).map((p) => (
                    <div key={p.id} className="catalog-card card">
                      <img className="catalog-img" src={productImages[p.nome] || imageSrc(p.nome) || productImages.default} alt={p.nome} onError={makeOnError(imageCandidates(p.nome))} />
                      <div style={{ fontWeight: 600 }}>{p.nome}</div>
                      <div style={{ color: 'var(--muted)' }}>{p.descricao || 'Produto Bebs Distribuidora'}</div>
                      <div style={{ marginTop: 8 }}>
                        <span className="badge price">R$ {p?.CampanhaProduto?.precoPromocional?.toFixed ? p.CampanhaProduto.precoPromocional.toFixed(2) : p.CampanhaProduto?.precoPromocional || '-'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h2>Catálogos</h2>
        {error && <div className="card">Erro ao carregar catálogos: {String(error.message || error)}</div>}
        {!!topProdutos.length ? (
          <div className="catalog-grid">
            {topProdutos.map((p) => (
              <div key={p.id} className="catalog-card card">
                <img className="catalog-img" src={productImages[p.nome] || imageSrc(p.nome) || productImages.default} alt={p.nome} onError={makeOnError(imageCandidates(p.nome))} />
                <div style={{ fontWeight: 600 }}>{p.nome}</div>
                <div style={{ color: 'var(--muted)' }}>{p.descricao || 'Produto Bebs Distribuidora'}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge price">R$ {Number(p.preco).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <div className="catalog-grid">
              {[
                { nome: 'Guaraná Normal', preco: 5.5, descricao: 'Clássico do Brasil' },
                { nome: 'Guaraná Light', preco: 5.9, descricao: 'Menos calorias' },
                { nome: 'Água com gás', preco: 3.2, descricao: 'Hidratação com borbulhas' },
                { nome: 'Água sem gás', preco: 2.8, descricao: 'Pureza e leveza' },
              ].map((p, i) => (
                <div key={i} className="catalog-card card">
                  <img className="catalog-img" src={productImages[p.nome] || imageSrc(p.nome) || productImages.default} alt={p.nome} onError={makeOnError(imageCandidates(p.nome))} />
                  <div style={{ fontWeight: 600 }}>{p.nome}</div>
                  <div style={{ color: 'var(--muted)' }}>{p.descricao}</div>
                  <div style={{ marginTop: 8 }}>
                    <span className="badge">R$ {Number(p.preco).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
