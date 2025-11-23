// Controller para operações CRUD de Produtos
const { Produto, Embalagem, UnidadeProducao } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const { embalagemId, unidadeProducaoId, embalagemIds, unidadeProducaoIds, ...data } = req.body;
      const produto = await Produto.create(data);
      const eIds = embalagemIds || (embalagemId ? [embalagemId] : []);
      const uIds = unidadeProducaoIds || (unidadeProducaoId ? [unidadeProducaoId] : []);
      if (eIds.length) await produto.setEmbalagens(eIds);
      if (uIds.length) await produto.setUnidadesProducao(uIds);
      return res.status(201).json(produto);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { embalagemIds, unidadeProducaoIds, ...data } = req.body;
      const [count] = await Produto.update(data, { where: { id } });
      if (!count) return res.status(404).json({ message: 'Produto não encontrado' });
      const updated = await Produto.findByPk(id);
      if (embalagemIds) await updated.setEmbalagens(embalagemIds);
      if (unidadeProducaoIds) await updated.setUnidadesProducao(unidadeProducaoIds);
      return res.json(updated);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const count = await Produto.destroy({ where: { id } });
      if (!count) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.status(204).send();
    } catch (err) { next(err); }
  },

  async findAll(req, res, next) {
    try {
      const produtos = await Produto.findAll({
        include: [
          { model: Embalagem, as: 'embalagens', through: { attributes: [] } },
          { model: UnidadeProducao, as: 'unidadesProducao', through: { attributes: [] } },
        ],
        order: [['id', 'ASC']],
      });
      return res.json(produtos);
    } catch (err) { next(err); }
  },

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
      return res.json(produto);
    } catch (err) { next(err); }
  },
};
