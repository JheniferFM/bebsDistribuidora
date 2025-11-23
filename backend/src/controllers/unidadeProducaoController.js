const { UnidadeProducao } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await UnidadeProducao.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await UnidadeProducao.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Unidade não encontrada' }); const r = await UnidadeProducao.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await UnidadeProducao.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Unidade não encontrada' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await UnidadeProducao.findAll({ order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await UnidadeProducao.findByPk(id); if (!r) return res.status(404).json({ message: 'Unidade não encontrada' }); return res.json(r); } catch (e) { next(e); } },
};
