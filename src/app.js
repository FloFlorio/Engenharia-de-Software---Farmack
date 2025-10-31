const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

// Página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/FarmackLogin.html'));
});

// Página principal
app.get('/second', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/FarmackTelaPrincipal.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

