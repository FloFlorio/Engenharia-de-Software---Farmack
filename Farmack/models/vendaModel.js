// models/vendaModel.js
const pool = require('../db');

async function createVenda(venda) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [resVenda] = await conn.query('INSERT INTO vendas (data, total) VALUES (?, ?)', [new Date(), venda.total || 0]);
    const vendaId = resVenda.insertId;

    for (const item of venda.itens) {
      // pega preço atual do produto (fallback para item.preco)
      const [rowsProd] = await conn.query('SELECT preco, estoque FROM produtos WHERE id = ?', [item.id]);
      if (!rowsProd || rowsProd.length === 0) throw new Error(`Produto ${item.id} não encontrado`);
      const produtoAtual = rowsProd[0];

      if (produtoAtual.estoque < item.q) {
        throw new Error(`Estoque insuficiente para o produto id=${item.id}`);
      }

      const precoUnit = item.preco !== undefined ? item.preco : produtoAtual.preco;

      await conn.query(
        'INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario) VALUES (?,?,?,?)',
        [vendaId, item.id, item.q, precoUnit]
      );

      await conn.query('UPDATE produtos SET estoque = estoque - ? WHERE id = ?', [item.q, item.id]);

      await conn.query('INSERT INTO movimentacoes (data, tipo, produto_id, quantidade) VALUES (?, ?, ?, ?)', [new Date(), 'Saída (venda)', item.id, item.q]);
    }

    await conn.commit();
    return { vendaId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function list(limit = 50){
  const [rows] = await pool.query('SELECT * FROM vendas ORDER BY data DESC LIMIT ?', [Number(limit)]);
  return rows;
}

async function getById(id){
  const [rows] = await pool.query('SELECT * FROM vendas WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  const venda = rows[0];
  const [itens] = await pool.query('SELECT vi.*, p.nome FROM venda_itens vi LEFT JOIN produtos p ON p.id = vi.produto_id WHERE vi.venda_id = ?', [id]);
  venda.itens = itens;
  return venda;
}

module.exports = { createVenda, list, getById };
