const express = require('express');
const app = express();

// Configuração de CORS para permitir requisições de qualquer origem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE'); // Permite os métodos especificados
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept" // Permite os cabeçalhos especificados
  );
  next();
});

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Definindo a porta para o servidor
const PORT = process.env.PORT || 3000;

// Importando as rotas da aplicação
const routes = require('./routes/routes');
app.use('/api', routes); // Prefixando as rotas com '/api'

// Iniciando o servidor (funcionando para Render)
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Obtendo a URL do MongoDB da variável de ambiente para maior segurança
var mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/seu_
