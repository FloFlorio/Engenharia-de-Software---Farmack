// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { swaggerUi, specs } = require("./swagger");

// rotas
const produtosRoute = require("./routes/produtos");
const vendasRoute = require("./routes/vendas");
const movsRoute = require("./routes/movimentacoes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== SWAGGER ==========
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ========== TESTE ==========
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// ========== ROTAS ==========
app.use("/api/produtos", produtosRoute);
app.use("/api/vendas", vendasRoute);
app.use("/api/movimentacoes", movsRoute);

// ========== FRONTEND ==========
app.use("/", express.static("public"));

// ========== START ==========
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));
