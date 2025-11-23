module.exports = {
  errorHandler(err, req, res, next) {
    if (err) {
      console.error('API Error:', err.message, err.stack);
    }
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
    res.status(status).json({ error: { message, details: err.errors || null } });
  },
};
