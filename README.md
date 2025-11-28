# Pharmacy Stock Control

API para controle de estoque de farmácias, com pipeline CI/CD automatizada no GitHub Actions e deploy via AWS ECS.

## 🧰 Tecnologias
- Node.js + Express
- GitHub Actions (CI/CD)
- Docker + AWS ECR + ECS (Não implementados)

## 🚀 Executar localmente

```bash
cd ~/Documents
git clone https://github.com/FernandoMathias/Engenharia-de-Software---Farmack.git
cd Engenharia-de-Software---Farmack
node server.js

- Abra no navegador para acessar a tela de login:
http://localhost:3000/

- Baixe o arquivo schema.sql:
mysql -u root -p < schema.sql
