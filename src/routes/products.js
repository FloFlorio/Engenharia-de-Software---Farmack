import express from "express";
const router = express.Router();

// Exemplo de estoque em memória
let products = [
  { id: 1, name: "Dipirona", quantity: 50 },
  { id: 2, name: "Paracetamol", quantity: 100 }
];

router.get("/", (req, res) => {
  res.json(products);
});

router.post("/", (req, res) => {
  const { name, quantity } = req.body;
  const id = products.length + 1;
  products.push({ id, name, quantity });
  res.status(201).json({ message: "Produto adicionado", id });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });
  product.quantity = req.body.quantity;
  res.json({ message: "Quantidade atualizada", product });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "Produto removido" });
});

export default router;
