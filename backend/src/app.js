// Configura e exporta a instância do Express para a aplicação
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

// Cria a aplicação Express
const app = express();

// Habilita recebimento e envio de JSON
app.use(express.json());

// Ativa CORS para permitir o consumo pelo frontend
app.use(cors());

// Prefixo das rotas da API
app.use('/api', routes);

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware centralizado de tratamento de erros
app.use(errorHandler);

module.exports = app;

