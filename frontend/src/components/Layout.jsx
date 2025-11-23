// Layout com navegação básica
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <Link className="brand" to="/">Bebs Distribuidora</Link>
          <nav className="nav">
            <Link to="/vitrine">Vitrine</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/produtos/novo">Cadastrar Produto</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/pedidos/novo">Cadastrar Pedido</Link>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
