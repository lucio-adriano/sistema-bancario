const express = require('express');
const rotas = express();

// Importar os controladores para cada rota
const contasController = require('./controladores/contas');
const transacoesController = require('./controladores/transacoes');

// Definir as rotas para cada endpoint
rotas.get('/contas', contasController.listarContas);
rotas.post('/contas', contasController.criarConta);
rotas.put('/contas/:numeroConta/usuario', contasController.atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', contasController.excluirConta);

rotas.post('/transacoes/depositar', transacoesController.depositar);
rotas.post('/transacoes/sacar', transacoesController.sacar);
rotas.post('/transacoes/transferir', transacoesController.transferir);

rotas.get('/contas/saldo', contasController.consultarSaldo);
// rotas.get('/contas/extrato', contasController.extrato);


module.exports = rotas;