// Página de cadastro de produtos
import React from 'react';
import ProductForm from '../components/ProductForm.jsx';

export default function ProductCreatePage() {
  return (
    <div className="section" style={{ justifyItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Produto</h2>
      <ProductForm onSaved={() => alert('Produto cadastrado!')} />
    </div>
  );
}
