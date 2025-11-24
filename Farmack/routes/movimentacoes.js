// routes/movimentacoes.js

/**
 * @swagger
 * tags:
 *   name: Movimentações
 *   description: Controle de entrada e saída de estoque
 */

/**
 * @swagger
 * /api/movimentacoes:
 *   get:
 *     summary: Lista últimas movimentações de estoque
 *     tags: [Movimentações]
 *     responses:
 *       200:
 *         description: Lista retornada
 */


const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/movimentacaoController');

/**
 * @swagger
 * tags:
 *   name: Movimentações
 *   description: Registro de entradas e saídas de estoque
 */

router.get('/', ctrl.list);
router.post('/', ctrl.create);

module.exports = router;
