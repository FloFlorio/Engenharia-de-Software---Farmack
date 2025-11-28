// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_aqui_mude_em_producao";

/**
 * Middleware para verificar se o usuário está autenticado
 * Verifica o token JWT no header Authorization
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token não fornecido. Acesso negado."
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token inválido ou expirado."
      });
    }
    req.user = user;
    next();
  });
}

/**
 * Middleware para verificar se o usuário tem uma das roles permitidas
 * @param {Array<string>} allowedRoles - Array de roles permitidas (ex: ['admin', 'farmaceutico'])
 */
function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Role de usuário não definida."
      });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Acesso negado. Você não tem permissão para esta ação."
      });
    }
  };
}

module.exports = {
  authenticateToken,
  authorizeRole
};
