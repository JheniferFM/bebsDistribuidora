// Middleware centralizado de tratamento de erros
module.exports = {
  errorHandler(err, req, res, next) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('API Error:', err.message, err.stack);
    }
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
    res.status(status).json({ error: { message, details: err.errors || null } });
  },
};
