const { Embalagem } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await Embalagem.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await Embalagem.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Embalagem não encontrada' }); const r = await Embalagem.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await Embalagem.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Embalagem não encontrada' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await Embalagem.findAll({ order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await Embalagem.findByPk(id); if (!r) return res.status(404).json({ message: 'Embalagem não encontrada' }); return res.json(r); } catch (e) { next(e); } },
};
