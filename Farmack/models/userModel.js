// models/userModel.js
const db = require("../db"); // Assume que db/index.js exporta o pool do mysql2/promise
const bcrypt = require("bcrypt");

/**
 * Cria um novo usuário no banco de dados
 * @param {string} email - Email do usuário
 * @param {string} password - Senha em texto plano (será hasheada)
 * @param {string} role - Papel do usuário ('cliente', 'farmaceutico', 'admin'). Padrão: 'cliente'
 * @returns {Promise<Object>} - Objeto com id do usuário criado
 */
async function createUser(email, password, role = 'cliente') {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = `
    INSERT INTO usuarios (email, password, role, created_at)
    VALUES (?, ?, ?, NOW())
  `;
  
  const [result] = await db.execute(query, [email, hashedPassword, role]);
  return { id: result.insertId };
}

/**
 * Verifica se um email já existe no banco de dados
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} - true se já existe
 */
async function emailExists(email) {
  const query = `
    SELECT COUNT(*) as count
    FROM usuarios
    WHERE email = ?
  `;
  
  const [rows] = await db.execute(query, [email]);
  return rows[0].count > 0;
}

/**
 * Deleta um usuário pelo ID
 * @param {number} id - ID do usuário a ser deletado
 * @returns {Promise<number>} - Número de linhas afetadas (0 ou 1)
 */
async function deleteUser(id) {
  const query = `
    DELETE FROM usuarios
    WHERE id = ?
  `;
  
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
}

/**
 * Busca usuário por email
 * @param {string} email - Email do usuário
 * @returns {Promise<Object|null>} - Dados do usuário (incluindo hash da senha) ou null se não encontrado
 */
async function findUserByEmail(email) {
  const query = `
    SELECT id, email, password, role, created_at, last_login
    FROM usuarios
    WHERE email = ?
  `;
  
  const [rows] = await db.execute(query, [email]);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Verifica se a senha fornecida corresponde ao hash armazenado
 * @param {string} plainPassword - Senha em texto plano
 * @param {string} hashedPassword - Hash da senha armazenado
 * @returns {Promise<boolean>} - true se a senha está correta
 */
async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Atualiza o timestamp do último login
 * @param {number} userId - ID do usuário
 * @returns {Promise<void>}
 */
async function updateLastLogin(userId) {
  const query = `UPDATE usuarios SET last_login = NOW() WHERE id = ?`;
  await db.execute(query, [userId]);
}

module.exports = {
  createUser,
  emailExists,
  deleteUser,
  findUserByEmail,
  verifyPassword,
  updateLastLogin
};
