import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();
app.use(express.json());

// Rotas
app.use("/products", productRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Pharmacy Stock API running successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
