const express = require('express');
const router = express.Router();

const { Categoria, Produto } = require('../models');

// Listagem
router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll({
    include: Produto,
    order: [['nome', 'ASC']]
  });
  res.render('categorias/index', { titulo: 'Categorias', categorias });
});

// Formulário
router.get('/nova', (req, res) => {
  res.render('categorias/nova', { titulo: 'Nova categoria', erro: null });
});

// Salvar
router.post('/', async (req, res) => {
  const nome = (req.body.nome || '').trim();

  try {
    await Categoria.create({ nome });
    res.redirect('/categorias');
  } catch (e) {
    res.render('categorias/nova', {
      titulo: 'Nova categoria',
      erro: 'Informe um nome válido e que ainda não exista.'
    });
  }
});

// Excluir (os produtos ficam sem categoria)
router.post('/:id/deletar', async (req, res) => {
  await Categoria.destroy({ where: { id: req.params.id } });
  res.redirect('/categorias');
});

module.exports = router;
