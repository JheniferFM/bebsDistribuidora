// Carrega Sequelize, registra modelos e define relacionamentos
const { sequelize } = require('../config/database');
const Produto = require('./Produto');
const Embalagem = require('./Embalagem');
const UnidadeProducao = require('./UnidadeProducao');
const Cliente = require('./Cliente');
const Pedido = require('./Pedido');
const PedidoItem = require('./PedidoItem');
const Equipe = require('./Equipe');
const Funcionario = require('./Funcionario');
const Campanha = require('./Campanha');
const HistoricoEquipe = require('./HistoricoEquipe');
const ProdutoEmbalagem = require('./ProdutoEmbalagem');
const ProdutoUnidade = require('./ProdutoUnidade');
const FuncionarioEquipe = require('./FuncionarioEquipe');
const CampanhaProduto = require('./CampanhaProduto');

// Associações
// Produto -> Embalagem (muitos produtos pertencem a uma embalagem)
Produto.belongsToMany(Embalagem, { through: ProdutoEmbalagem, as: 'embalagens', foreignKey: 'produtoId', otherKey: 'embalagemId' });
Embalagem.belongsToMany(Produto, { through: ProdutoEmbalagem, as: 'produtos', foreignKey: 'embalagemId', otherKey: 'produtoId' });

// Produto -> UnidadeProducao (muitos produtos pertencem a uma unidade)
Produto.belongsToMany(UnidadeProducao, { through: ProdutoUnidade, as: 'unidadesProducao', foreignKey: 'produtoId', otherKey: 'unidadeProducaoId' });
UnidadeProducao.belongsToMany(Produto, { through: ProdutoUnidade, as: 'produtos', foreignKey: 'unidadeProducaoId', otherKey: 'produtoId' });

// Pedido -> PedidoItem (um pedido tem muitos itens)
Pedido.hasMany(PedidoItem, { as: 'itens', foreignKey: 'pedidoId', onDelete: 'CASCADE' });
PedidoItem.belongsTo(Pedido, { as: 'pedido', foreignKey: 'pedidoId' });

// Pedido -> Cliente (muitos pedidos pertencem a um cliente)
Pedido.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId' });
Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'clienteId' });

Pedido.belongsTo(Funcionario, { as: 'vendedor', foreignKey: 'vendedorId' });
Funcionario.hasMany(Pedido, { as: 'pedidos', foreignKey: 'vendedorId' });

// PedidoItem -> Produto (cada item pertence a um produto)
PedidoItem.belongsTo(Produto, { as: 'produto', foreignKey: 'produtoId' });
Produto.hasMany(PedidoItem, { as: 'pedidoItens', foreignKey: 'produtoId' });

// Equipe -> Funcionario (uma equipe tem muitos funcionários)
Funcionario.belongsToMany(Equipe, { through: FuncionarioEquipe, as: 'equipes', foreignKey: 'funcionarioId', otherKey: 'equipeId' });
Equipe.belongsToMany(Funcionario, { through: FuncionarioEquipe, as: 'funcionarios', foreignKey: 'equipeId', otherKey: 'funcionarioId' });

// Equipe -> HistoricoEquipe (uma equipe possui histórico de gerência)
Equipe.hasMany(HistoricoEquipe, { as: 'historicos', foreignKey: 'equipeId' });
HistoricoEquipe.belongsTo(Equipe, { as: 'equipe', foreignKey: 'equipeId' });
HistoricoEquipe.belongsTo(Funcionario, { as: 'gerente', foreignKey: 'funcionarioId' });
Funcionario.hasMany(HistoricoEquipe, { as: 'historicosGerencia', foreignKey: 'funcionarioId' });

Campanha.belongsToMany(Produto, { through: CampanhaProduto, as: 'produtos', foreignKey: 'campanhaId', otherKey: 'produtoId' });
Produto.belongsToMany(Campanha, { through: CampanhaProduto, as: 'campanhas', foreignKey: 'produtoId', otherKey: 'campanhaId' });

// Exporta sequelize e modelos
module.exports = {
  sequelize,
  Produto,
  Embalagem,
  UnidadeProducao,
  Cliente,
  Pedido,
  PedidoItem,
  Equipe,
  Funcionario,
  Campanha,
  HistoricoEquipe,
  ProdutoEmbalagem,
  ProdutoUnidade,
  FuncionarioEquipe,
  CampanhaProduto,
};
