// routes/vendas.js

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: Endpoints relacionados ao processo de venda
 */

/**
 * @swagger
 * /api/vendas:
 *   post:
 *     summary: Finaliza uma venda
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *                     preco:
 *                       type: number
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venda registrada
 *       400:
 *         description: Carrinho inválido
 */


const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vendaController');

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: Processamento e registro de vendas
 */

router.post('/', ctrl.checkout);
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

module.exports = router;
