const { Equipe, Funcionario } = require('../models');

module.exports = {
  async create(req, res, next) { try { const r = await Equipe.create(req.body); return res.status(201).json(r); } catch (e) { next(e); } },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const current = await Equipe.findByPk(id);
      if (!current) return res.status(404).json({ message: 'Equipe não encontrada' });
      if (Object.prototype.hasOwnProperty.call(req.body, 'regiao') && req.body.regiao !== current.regiao) {
        const err = new Error('Alteração de região não permitida'); err.status = 400; throw err;
      }
      const [c] = await Equipe.update(req.body, { where: { id } });
      if (!c) return res.status(404).json({ message: 'Equipe não encontrada' });
      const r = await Equipe.findByPk(id);
      return res.json(r);
    } catch (e) { next(e); }
  },
  async delete(req, res, next) { try { const { id } = req.params; const c = await Equipe.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Equipe não encontrada' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await Equipe.findAll({ include: [{ model: Funcionario, as: 'funcionarios' }], order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await Equipe.findByPk(id, { include: [{ model: Funcionario, as: 'funcionarios' }] }); if (!r) return res.status(404).json({ message: 'Equipe não encontrada' }); return res.json(r); } catch (e) { next(e); } },
};
