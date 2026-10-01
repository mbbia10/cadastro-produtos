const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Relacionamento: uma Categoria tem vários Produtos; cada Produto pertence a uma Categoria.
// Isso cria a chave estrangeira "categoriaId" na tabela de produtos.
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', onDelete: 'SET NULL' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = {
  sequelize,
  Categoria,
  Produto
};
