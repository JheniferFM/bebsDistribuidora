const { Campanha, Produto } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await Campanha.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await Campanha.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Campanha não encontrada' }); const r = await Campanha.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await Campanha.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Campanha não encontrada' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await Campanha.findAll({ include: [{ model: Produto, as: 'produtos', through: { attributes: ['precoPromocional'] } }], order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await Campanha.findByPk(id, { include: [{ model: Produto, as: 'produtos', through: { attributes: ['precoPromocional'] } }] }); if (!r) return res.status(404).json({ message: 'Campanha não encontrada' }); return res.json(r); } catch (e) { next(e); } },
};
