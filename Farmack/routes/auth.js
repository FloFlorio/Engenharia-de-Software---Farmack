// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro e Gerenciamento de Usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: "Registra um novo usuário (role padrão: cliente)"
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único do usuário.
 *               password:
 *                 type: string
 *                 description: Senha (mínimo 6 caracteres, 1 número, 1 maiúscula).
 *     responses:
 *       201:
 *         description: Usuário cliente cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuário cliente cadastrado com sucesso!
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: novo.cliente@exemplo.com
 *                 role:
 *                   type: string
 *                   example: cliente
 *       400:
 *         description: Erro de validação (email inválido, senha fraca, campos obrigatórios).
 *       409:
 *         description: Conflito (email já cadastrado).
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário.
 *               password:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Email e senha são obrigatórios.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/user/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID (Apenas Admin)
 *     tags: [Autenticação]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado.
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuário com ID 1 deletado com sucesso.
 *       400:
 *         description: ID de usuário inválido.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete("/user/:id", authController.remove);

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro e Gerenciamento de Usuários
 */

module.exports = router;
