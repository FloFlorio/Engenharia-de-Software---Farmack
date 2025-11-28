// controllers/authController.js
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Necessário para gerar o token JWT

// Chave secreta para JWT (deve ser lida do .env)
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_aqui_mude_em_producao";
const JWT_EXPIRES_IN = "7d"; // Token expira em 7 dias

/**
 * Valida o formato do email usando regex
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  // Regex para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida a complexidade da senha
 * - Mínimo 6 caracteres
 * - Pelo menos 1 número
 * - Pelo menos 1 letra maiúscula
 * @param {string} password
 * @returns {boolean}
 */
function validatePassword(password) {
  // Mínimo 6 caracteres
  if (password.length < 6) return false;
  // Pelo menos 1 número
  if (!/[0-9]/.test(password)) return false;
  // Pelo menos 1 letra maiúscula
  if (!/[A-Z]/.test(password)) return false;
  
  return true;
}

/**
 * Registra um novo usuário (role padrão: 'cliente')
 * POST /api/auth/register
 * Body: { email, password }
 */
async function register(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validação de campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios."
      });
    }

    // 2. Validação de formato do email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato de email inválido."
      });
    }

    // 3. Validação de complexidade da senha
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "A senha deve ter no mínimo 6 caracteres, incluindo pelo menos 1 número e 1 letra maiúscula."
      });
    }

    // 4. Validação de unicidade do email
    const exists = await userModel.emailExists(email);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Este email já está cadastrado."
      });
    }

    // 5. Criação do usuário (role padrão 'cliente')
    const result = await userModel.createUser(email, password, 'cliente');

    res.status(201).json({
      success: true,
      message: "Usuário cliente cadastrado com sucesso!",
      userId: result.id,
      email: email,
      role: 'cliente'
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno ao cadastrar usuário. Tente novamente."
    });
  }
}

/**
 * Realiza o login do usuário
 * POST /api/auth/login
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validação de campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios."
      });
    }

    // 2. Buscar usuário
    const user = await userModel.findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas."
      });
    }

    // 3. Verificar senha
    const passwordValid = await userModel.verifyPassword(password, user.password);
    
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas."
      });
    }

    // 4. Atualizar último login
    await userModel.updateLastLogin(user.id);

    // 5. Gerar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 6. Retornar sucesso com token
    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao realizar login. Tente novamente."
    });
  }
}

/**
 * Deleta um usuário pelo ID
 * DELETE /api/auth/user/:id
 */
async function remove(req, res) {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID de usuário inválido."
      });
    }

    const affectedRows = await userModel.deleteUser(userId);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado."
      });
    }

    res.status(200).json({
      success: true,
      message: `Usuário com ID ${userId} deletado com sucesso.`
    });

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno ao deletar usuário. Tente novamente."
    });
  }
}

module.exports = {
  register,
  login,
  remove
};
