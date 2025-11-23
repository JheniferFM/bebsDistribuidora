const { Pedido, PedidoItem, Cliente, Produto, Funcionario } = require('../models');
const pedidoService = require('../services/pedidoService');

module.exports = {
  async create(req, res, next) {
    try {
      const { itens, ...pedidoData } = req.body;
      const pedido = await Pedido.create(pedidoData);
      if (Array.isArray(itens)) {
        for (const item of itens) {
          await PedidoItem.create({ ...item, pedidoId: pedido.id });
        }
      }
      const total = await pedidoService.calcularTotal(pedido.id);
      await pedido.update({ total });
      const pedidoCompleto = await Pedido.findByPk(pedido.id, {
        include: [
          { model: PedidoItem, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
          { model: Cliente, as: 'cliente' },
          { model: Funcionario, as: 'vendedor' },
        ],
      });
      return res.status(201).json(pedidoCompleto);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [count] = await Pedido.update(req.body, { where: { id } });
      if (!count) return res.status(404).json({ message: 'Pedido não encontrado' });
      const total = await pedidoService.calcularTotal(id);
      await Pedido.update({ total }, { where: { id } });
      const updated = await Pedido.findByPk(id);
      return res.json(updated);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const count = await Pedido.destroy({ where: { id } });
      if (!count) return res.status(404).json({ message: 'Pedido não encontrado' });
      return res.status(204).send();
    } catch (err) { next(err); }
  },

  async findAll(req, res, next) {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          { model: PedidoItem, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
          { model: Cliente, as: 'cliente' },
          { model: Funcionario, as: 'vendedor' },
        ],
        order: [['id', 'ASC']],
      });
      return res.json(pedidos);
    } catch (err) { next(err); }
  },

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, {
        include: [
          { model: PedidoItem, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
          { model: Cliente, as: 'cliente' },
          { model: Funcionario, as: 'vendedor' },
        ],
      });
      if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
      return res.json(pedido);
    } catch (err) { next(err); }
  },
};
