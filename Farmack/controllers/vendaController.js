// controllers/vendaController.js
const vendaModel = require('../models/vendaModel');

async function checkout(req, res){
  try {
    const venda = req.body; // { itens: [{id,q,preco}], total? }
    if(!venda || !Array.isArray(venda.itens) || venda.itens.length===0) return res.status(400).json({ error: 'Carrinho inválido' });

    // valida itens
    for (const it of venda.itens) {
      if (!it.id || !it.q || it.q <= 0) return res.status(400).json({ error: 'Itens inválidos' });
    }

    const result = await vendaModel.createVenda(venda);
    res.status(201).json({ success: true, id: result.vendaId });
  } catch(err){
    console.error(err);
    // se é erro de estoque (mensagem gerada no model) retornamos 400
    if (err.message && err.message.startsWith('Estoque insuficiente')) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
}

async function list(req, res){
  try{
    const limit = req.query.limit || 50;
    const rows = await vendaModel.list(limit);
    res.status(200).json(rows);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
}

async function get(req,res){
  try{
    const venda = await vendaModel.getById(req.params.id);
    if(!venda) return res.status(404).json({ error: 'Venda não encontrada' });
    res.status(200).json(venda);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar venda' });
  }
}

module.exports = { checkout, list, get };
