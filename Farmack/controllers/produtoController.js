// controllers/produtoController.js
const produtoModel = require('../models/produtoModel');

async function list(req, res){
  try{
    const list = await produtoModel.getAll();
    res.status(200).json(list);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
}

async function get(req, res){
  try{
    const prod = await produtoModel.getById(req.params.id);
    if(!prod) return res.status(404).json({ error: 'Produto não encontrado' });
    res.status(200).json(prod);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
}

async function search(req, res){
  try{
    const q = req.query.q || '';
    const results = q ? await produtoModel.search(q) : await produtoModel.getAll();
    res.status(200).json(results);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}

async function create(req,res){
  try{
    const body = req.body;
    if(!body || !body.nome || body.preco === undefined || body.estoque === undefined){
      return res.status(400).json({ error: 'nome, preco e estoque são obrigatórios' });
    }
    const created = await produtoModel.create(body);
    res.status(201).json(created);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

async function update(req,res){
  try{
    const id = req.params.id;
    const body = req.body;
    const prodExists = await produtoModel.getById(id);
    if(!prodExists) return res.status(404).json({ error: 'Produto não encontrado' });
    const updated = await produtoModel.update(id, body);
    res.status(200).json(updated);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}

async function remove(req,res){
  try{
    const id = req.params.id;
    const prodExists = await produtoModel.getById(id);
    if(!prodExists) return res.status(404).json({ error: 'Produto não encontrado' });
    await produtoModel.remove(id);
    res.status(204).send();
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
}

module.exports = { list, get, search, create, update, remove };
