const express = require('express');
const app = express();

// Configuração de CORS para permitir requisições de qualquer origem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE'); // Permite os métodos especificados
  res.header(
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

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Obtendo os parâmetros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = userArgs[0]; // URL do MongoDB passada como argumento

// Configurando a conexão com o Banco de Dados MongoDB
var mongoose = require('mongoose');
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }); // Adicionando algumas opções recomendadas
mongoose.Promise = global.Promise;

// Monitorando a conexão com o banco
const db = mongoose.connection;

// Se houver erro na conexão
db.on('error', (error) => {
  console.log('Erro de conexão:', error); // Mensagem de erro mais explicativa
});

// Quando a conexão for bem-sucedida
