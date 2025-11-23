// Serviço de regras de negócio de pedidos
const { PedidoItem } = require('../models');

module.exports = {
  // Calcula o total do pedido somando quantidade * preçoUnitario de cada item
  async calcularTotal(pedidoId) {
    const itens = await PedidoItem.findAll({ where: { pedidoId } });
    const total = itens.reduce((acc, item) => {
      const q = Number(item.quantidade || 0);
      const p = Number(item.precoUnitario || 0);
      return acc + q * p;
    }, 0);
    return Number(total.toFixed(2));
  },
};

