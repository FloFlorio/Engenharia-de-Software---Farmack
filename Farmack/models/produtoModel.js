// models/produtoModel.js
const pool = require('../db');

async function getAll() {
  const [rows] = await pool.query('SELECT * FROM produtos ORDER BY nome');
  return rows;
}

async function getById(id){
  const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
}

async function search(q){
  const like = `%${q}%`;
  const [rows] = await pool.query('SELECT * FROM produtos WHERE nome LIKE ? OR ean LIKE ? OR categoria LIKE ?', [like, like, like]);
  return rows;
}

async function create(prod){
  const { ean = null, nome, categoria = null, preco = 0, estoque = 0, pontoPedido = 0, lote = null, validade = null } = prod;
  const [result] = await pool.query(
    'INSERT INTO produtos (ean,nome,categoria,preco,estoque,pontoPedido,lote,validade) VALUES (?,?,?,?,?,?,?,?)',
    [ean,nome,categoria,preco,estoque,pontoPedido,lote,validade]
  );
  const created = await getById(result.insertId);
  return created;
}

async function update(id, prod){
  const fields = [];
  const values = [];
  const allowed = ['ean','nome','categoria','preco','estoque','pontoPedido','lote','validade'];
  allowed.forEach(k => {
    if (prod[k] !== undefined) { fields.push(`${k} = ?`); values.push(prod[k]); }
  });
  if (fields.length === 0) return await getById(id);
  values.push(id);
  await pool.query(`UPDATE produtos SET ${fields.join(', ')} WHERE id = ?`, values);
  return await getById(id);
}

async function remove(id){
  await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
  return;
}

module.exports = { getAll, getById, search, create, update, remove };
