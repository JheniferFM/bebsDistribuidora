import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="section">
      <div className="card" style={{ padding: 24 }}>
        <h1 style={{ marginBottom: 8 }}>Bebs Distribuidora</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
          Produção e comercialização de bebidas. Acesse os módulos para gerenciar produtos,
          clientes e pedidos.
        </p>
        <div className="actions">
          <Link className="button" to="/produtos">Ver Produtos</Link>
          <Link className="button secondary" to="/produtos/novo">Cadastrar Produto</Link>
          <Link className="button secondary" to="/clientes">Ver Clientes</Link>
          <Link className="button secondary" to="/pedidos/novo">Cadastrar Pedido</Link>
        </div>
      </div>
    </div>
  );
}
