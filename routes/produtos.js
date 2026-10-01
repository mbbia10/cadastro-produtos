const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Produto, Categoria } = require('../models');

// READ: listagem (com pesquisa opcional por nome: /produtos?busca=mouse)
router.get('/', async (req, res) => {
  const busca = (req.query.busca || '').trim();

  const produtos = await Produto.findAll({
    where: busca ? { nome: { [Op.like]: `%${busca}%` } } : {},
    include: Categoria,
    order: [['nome', 'ASC']]
  });

  res.render('produtos/index', {
    titulo: 'Produtos',
    produtos,
    busca,
    categoriaAtual: null
  });
});

// Desafio 2: produtos de uma categoria
router.get('/categoria/:id', async (req, res, next) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return next();

  const produtos = await Produto.findAll({
    where: { categoriaId: categoria.id },
    include: Categoria,
    order: [['nome', 'ASC']]
  });

  res.render('produtos/index', {
    titulo: `Produtos — ${categoria.nome}`,
    produtos,
    busca: '',
    categoriaAtual: categoria
  });
});

// CREATE: formulário
router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
  res.render('produtos/novo', { titulo: 'Novo produto', categorias });
});

// CREATE: salvar
router.post('/', async (req, res) => {
  const dados = { ...req.body };
  if (!dados.categoriaId) dados.categoriaId = null;

  await Produto.create(dados);
  res.redirect('/produtos');
});

// UPDATE: formulário
router.get('/:id/editar', async (req, res, next) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return next();

  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
  res.render('produtos/editar', { titulo: 'Editar produto', produto, categorias });
});

// UPDATE: salvar
router.post('/:id', async (req, res) => {
  const dados = { ...req.body };
  if (!dados.categoriaId) dados.categoriaId = null;

  await Produto.update(dados, {
    where: { id: req.params.id }
  });

  res.redirect('/produtos');
});

// DELETE
router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({
    where: { id: req.params.id }
  });

  res.redirect('/produtos');
});

module.exports = router;
