// Define as rotas principais da aplicação React e o layout
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsListPage from './pages/ProductsListPage.jsx';
import ProductCreatePage from './pages/ProductCreatePage.jsx';
import ClientsListPage from './pages/ClientsListPage.jsx';
import OrderCreatePage from './pages/OrderCreatePage.jsx';
import VitrinePage from './pages/VitrinePage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vitrine" element={<VitrinePage />} />
          <Route path="/produtos" element={<ProductsListPage />} />
          <Route path="/produtos/novo" element={<ProductCreatePage />} />
          <Route path="/clientes" element={<ClientsListPage />} />
          <Route path="/pedidos/novo" element={<OrderCreatePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
