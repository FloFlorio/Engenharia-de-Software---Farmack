// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Farmácia",
      version: "1.0.0",
      description: "Documentação da API da farmácia usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/*.js"], // onde ficam as docs
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
