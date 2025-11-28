// controllers/movimentacaoController.js
const pool = require('../db');

async function list(req, res){
  try {
    const [rows] = await pool.query('SELECT m.*, p.nome as produto_nome FROM movimentacoes m LEFT JOIN produtos p ON p.id = m.produto_id ORDER BY m.data DESC LIMIT 100');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar movimentações' });
  }
}

async function create(req, res){
  try {
    const { produto_id, estoque, tipo } = req.body;
    if (!produto_id || !Number.isInteger(estoque)) return res.status(400).json({ error: 'produto_id e estoque são obrigatórios' });

    const [result] = await pool.query('INSERT INTO movimentacoes (data,tipo,produto_id,estoque) VALUES (?, ?, ?, ?)', [new Date(), tipo || 'Entrada', produto_id, estoque]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar movimentação' });
  }
}

module.exports = { list, create };
