// Tabela reutilizável simples
import React from 'react';

export default function Table({ columns, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id || JSON.stringify(row)}>
            {columns.map((c) => (
              <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
