const { HistoricoEquipe, Equipe } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await HistoricoEquipe.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await HistoricoEquipe.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Histórico não encontrado' }); const r = await HistoricoEquipe.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await HistoricoEquipe.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Histórico não encontrado' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await HistoricoEquipe.findAll({ include: [{ model: Equipe, as: 'equipe' }], order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await HistoricoEquipe.findByPk(id, { include: [{ model: Equipe, as: 'equipe' }] }); if (!r) return res.status(404).json({ message: 'Histórico não encontrado' }); return res.json(r); } catch (e) { next(e); } },
};
