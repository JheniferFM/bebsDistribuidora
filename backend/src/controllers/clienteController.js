const { Cliente } = require('../models');

function isValidCNPJ(v) {
  const d = String(v || '').replace(/\D/g, '');
  if (d.length !== 14) return false;
  if (/^([0-9])\1{13}$/.test(d)) return false;
  return true;
}

module.exports = {
  async create(req, res, next) {
    try {
      const { cnpj } = req.body;
      if (!isValidCNPJ(cnpj)) { const err = new Error('CNPJ inválido'); err.status = 400; throw err; }
      const r = await Cliente.create(req.body);
      return res.status(201).json(r);
    } catch (e) { next(e); }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { cnpj } = req.body;
      if (cnpj !== undefined && !isValidCNPJ(cnpj)) { const err = new Error('CNPJ inválido'); err.status = 400; throw err; }
      const [c] = await Cliente.update(req.body, { where: { id } });
      if (!c) return res.status(404).json({ message: 'Cliente não encontrado' });
      const r = await Cliente.findByPk(id);
      return res.json(r);
    } catch (e) { next(e); }
  },
  async delete(req, res, next) { try { const { id } = req.params; const c = await Cliente.destroy({ where: { id } }); if (!c) return res.status(404).json({ message: 'Cliente não encontrado' }); return res.status(204).send(); } catch (e) { next(e); } },
  async findAll(req, res, next) { try { const r = await Cliente.findAll({ order: [['id', 'ASC']] }); return res.json(r); } catch (e) { next(e); } },
  async findById(req, res, next) { try { const { id } = req.params; const r = await Cliente.findByPk(id); if (!r) return res.status(404).json({ message: 'Cliente não encontrado' }); return res.json(r); } catch (e) { next(e); } },
};
