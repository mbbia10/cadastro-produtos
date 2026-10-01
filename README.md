# Cadastro de Produtos — MVC

## Integrante

Nome do integrante — RM 00000 *(preencha com seu nome e RM)*

## Sobre o projeto

Aplicação web de cadastro de produtos desenvolvida com o padrão arquitetural MVC, usando **Node.js**, **Express**, **EJS**, **Sequelize** e **SQLite**.

## Como executar

Pré-requisito: Node.js instalado.

```bash
npm install
npm start
```

Acesse: http://localhost:3000 (o banco `database.sqlite` é criado automaticamente na primeira execução).

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro de categorias
- Produtos por categoria
- Pesquisa de produtos por nome

## Estrutura

```
cadastro-produtos/
├── app.js
├── package.json
├── bin/www               # inicia o servidor e sincroniza o banco
├── models/index.js       # Models (Categoria, Produto) e relacionamento
├── routes/               # rotas/controllers (index, produtos, categorias)
├── views/                # páginas EJS (produtos/, categorias/, partials/)
└── public/               # arquivos estáticos (CSS)
```

## Desafios

### Desafio 1 — Categorias

Criei o Model `Categoria` (`id`, `nome`) e defini o relacionamento em `models/index.js`:
`Categoria.hasMany(Produto)` e `Produto.belongsTo(Categoria)`. O Sequelize cria a chave estrangeira
`categoriaId` na tabela de produtos, então a relação fica persistida no banco. Há rotas para listar, cadastrar
e excluir categorias (`/categorias`), os formulários de produto têm um `<select>` de categoria e a listagem
mostra a categoria de cada produto (usando `include: Categoria`).

### Desafio 2 — Produtos por categoria

Criei a rota `GET /produtos/categoria/:id`. Ela busca a categoria com `findByPk` e depois os produtos com
`Produto.findAll({ where: { categoriaId } })`, reaproveitando a página `produtos/index.ejs`. O nome da categoria
na listagem é um link para essa rota. Se a categoria não existir, retorna 404.

### Desafio extra — Pesquisa

Na rota `GET /produtos`, o parâmetro `busca` (`/produtos?busca=mouse`) aplica um filtro com
`Op.like` do Sequelize: `where: { nome: { [Op.like]: '%termo%' } }`. O formulário de pesquisa fica no topo da listagem.
