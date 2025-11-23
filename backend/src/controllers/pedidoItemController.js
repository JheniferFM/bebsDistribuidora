const { PedidoItem, Produto } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await PedidoItem.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await PedidoItem.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Item não encontrado' }); const r = await PedidoItem.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await PedidoItem.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Item não encontrado' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await PedidoItem.findAll({ include: [{ model: Produto, as: 'produto' }], order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await PedidoItem.findByPk(id, { include: [{ model: Produto, as: 'produto' }] }); if (!r) return res.status(404).json({ message: 'Item não encontrado' }); return res.json(r); } catch (e) { next(e); } },
};
