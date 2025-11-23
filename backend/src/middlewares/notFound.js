// Middleware para rotas não encontradas (404)
module.exports = {
  notFound(req, res, next) {
    res.status(404).json({ message: 'Rota não encontrada' });
  },
};

