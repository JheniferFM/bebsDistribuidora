// Inicia o servidor HTTP da aplicação
require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3001;

// Sincroniza os modelos com o banco e inicia o servidor
sequelize.sync({ alter: false })
  .then(() => {
    console.log('Banco sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor iniciado em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1);
  });

