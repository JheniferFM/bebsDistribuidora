# Bebs Distribuidora — Sistema de Produção e Vendas

Sistema full‑stack para controle de produtos, produção, vendas e campanhas da Cervejaria BeboSim.

## Visão Geral
- Backend: `Node.js + Express + Sequelize + SQLite` (MVC manual, API REST em `/api`).
- Frontend: `React + Vite` (SPA). Consome o backend via `axios` usando `VITE_API_URL`.

## Arquitetura
- Models e associações: `backend/src/models/` com registro central em `backend/src/models/index.js`.
- Controllers e regras: `backend/src/controllers/` (inclui validação de CNPJ, regra de região imutável e cálculo de total de pedidos).
- Rotas REST: `backend/src/routes/` registradas em `backend/src/routes/index.js` sob `/api`.
- Middlewares: `notFound` e `errorHandler` em `backend/src/middlewares/`.
- Frontend: páginas em `frontend/src/pages/`, layout em `frontend/src/components/`, estilos em `frontend/src/styles/`.

## Requisitos Atendidos (Resumo)
- Produtos com estoque, preço, comissão e fórmula: `backend/src/models/Produto.js`.
- Unidades de produção com CNPJ: `backend/src/models/UnidadeProducao.js`.
- N:N Produto↔Unidade e Produto↔Embalagem: `backend/src/models/index.js`.
- Equipes e vendedores/gerentes, histórico de gerência: `backend/src/models/Equipe.js`, `Funcionario.js`, `HistoricoEquipe.js`, `FuncionarioEquipe.js`.
- Clientes PJ (CNPJ validado): `backend/src/controllers/clienteController.js`.
- Pedidos com vendedor, cliente, número/data e itens: `backend/src/models/Pedido.js`, `PedidoItem.js`, `backend/src/controllers/pedidoController.js`.
- Campanhas com produtos e preços promocionais: `backend/src/models/Campanha.js`, `CampanhaProduto.js`.

## Instalação
1. Requisitos: Node.js 18+, npm.
2. Instalar dependências:
   - Backend: `cd backend && npm install`
   - Frontend: `cd ../frontend && npm install`

## Execução (Desenvolvimento)
- Backend (porta padrão 3001):
  - `cd backend`
  - `npm run dev`
  - Opcional: definir porta `PORT=3002`
- Frontend (porta 5173):
  - `cd frontend`
  - `set VITE_API_URL=http://localhost:3001/api` (Windows PowerShell) ou `VITE_API_URL=http://localhost:3001/api`
  - `npm run dev`
- Acesse: `http://localhost:5173/`

## Seed de Dados
- Popula produtos, embalagens, unidades, clientes e campanhas.
- Com backend parado: `cd backend && npm run seed`.

## Variáveis de Ambiente
- Backend:
  - `PORT`: porta do servidor (default `3001`).
  - `DB_DIALECT`, `DB_STORAGE`, `DB_LOGGING` (default `sqlite`, `database.sqlite`, `false`).
- Frontend:
  - `VITE_API_URL`: base da API (ex.: `http://localhost:3001/api`).

## Principais Endpoints
- Produtos: `GET/POST/PUT/DELETE /api/produtos`
- Embalagens: `GET/POST/PUT/DELETE /api/embalagens`
- Unidades de Produção: `GET/POST/PUT/DELETE /api/unidades-producao`
- Clientes: `GET/POST/PUT/DELETE /api/clientes`
- Pedidos: `GET/POST/PUT/DELETE /api/pedidos`
- Itens de Pedido: `GET/POST/PUT/DELETE /api/pedidos-itens`
- Equipes: `GET/POST/PUT/DELETE /api/equipes`
- Funcionários: `GET/POST/PUT/DELETE /api/funcionarios`
- Campanhas: `GET/POST/PUT/DELETE /api/campanhas`
- Histórico de Equipe: `GET/POST/PUT/DELETE /api/historicos-equipe`

## Frontend — Páginas
- Home: `/`
- Vitrine (campanhas e catálogos): `/vitrine`
- Produtos: `/produtos` e cadastro `/produtos/novo`
- Clientes: `/clientes`
- Novo Pedido: `/pedidos/novo`

## Responsividade
- Grades e navegação adaptadas com media queries: `frontend/src/styles/globals.css`.

## Desenvolvimento
- Backend serviço de pedidos (total): `backend/src/services/pedidoService.js`.
- Middlewares: `backend/src/middlewares/notFound.js`, `backend/src/middlewares/errorHandler.js`.
- Para incluir vínculos N:N no retorno de produtos, usar includes: `backend/src/controllers/produtoController.js`.

## Problemas Comuns
- `ERR_CONNECTION_REFUSED` em `/vitrine`: inicie o frontend com `npm run dev` e garanta `VITE_API_URL` para o backend ativo.
- CNPJ inválido: o backend retorna status 400 em `/api/clientes` no create/update.

