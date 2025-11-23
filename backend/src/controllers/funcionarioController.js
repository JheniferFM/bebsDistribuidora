// Controller CRUD de Funcionários
const { Funcionario, Equipe } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await Funcionario.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) { try { const { id } = req.params; const [c] = await Funcionario.update(req.body, { where: { id } }); if (!c) return res.status(404).json({ message: 'Funcionário não encontrado' }); const r = await Funcionario.findByPk(id); return res.json(r); } catch (e) { next(e); } },
  async delete(req, res, next) { try { const { id } = req.params; const c = await Funcionario.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Funcionário não encontrado' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await Funcionario.findAll({ include: [{ model: Equipe, as: 'equipe' }], order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await Funcionario.findByPk(id, { include: [{ model: Equipe, as: 'equipe' }] }); if (!r) return res.status(404).json({ message: 'Funcionário não encontrado' }); return res.json(r); } catch (e) { next(e); } },
};

