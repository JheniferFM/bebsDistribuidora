const express = require('express');
const produtoRoutes = require('./produtoRoutes');
const embalagemRoutes = require('./embalagemRoutes');
const unidadeProducaoRoutes = require('./unidadeProducaoRoutes');
const clienteRoutes = require('./clienteRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const pedidoItemRoutes = require('./pedidoItemRoutes');
const equipeRoutes = require('./equipeRoutes');
const funcionarioRoutes = require('./funcionarioRoutes');
const campanhaRoutes = require('./campanhaRoutes');
const historicoEquipeRoutes = require('./historicoEquipeRoutes');

const router = express.Router();

router.use('/produtos', produtoRoutes);
router.use('/embalagens', embalagemRoutes);
router.use('/unidades-producao', unidadeProducaoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/pedidos-itens', pedidoItemRoutes);
router.use('/equipes', equipeRoutes);
router.use('/funcionarios', funcionarioRoutes);
router.use('/campanhas', campanhaRoutes);
router.use('/historicos-equipe', historicoEquipeRoutes);

module.exports = router;
