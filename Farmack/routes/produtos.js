// routes/produtos.js


/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints de gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */

/**
 * @swagger
 * /api/produtos/search:
 *   get:
 *     summary: Busca produtos por nome
 *     tags: [Produtos]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         description: Texto da pesquisa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados encontrados
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não existe
 */

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: integer
 *               lote:
 *                 type: string
 *               validade:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Produto criado
 */


const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtoController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints de gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um produto
 *     tags: [Produtos]
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Produtos]
 */
router.get('/:id', ctrl.get);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 */
router.delete('/:id', ctrl.remove);

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Busca produtos (use query param q)
 *     tags: [Produtos]
 */
router.get('/search', ctrl.search); // mantive rota search para compatibilidade; você pode usar ?q=
module.exports = router;
