const express = require('express');
const rotas = express();

const contasController = require('./controladores/contas');
const transacoesController = require('./controladores/transacoes');
const intermediarioController = require('./intermediarios');

rotas.get('/contas', intermediarioController.admin, contasController.listarContas);
rotas.post('/contas', contasController.criarConta);
rotas.put('/contas/:numeroConta/usuario', contasController.atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', contasController.excluirConta);
rotas.get('/contas/saldo', contasController.consultarSaldo);
rotas.get('/contas/extrato', contasController.extrato);

rotas.post('/transacoes/depositar', transacoesController.depositar);
rotas.post('/transacoes/sacar', transacoesController.sacar);
rotas.post('/transacoes/transferir', transacoesController.transferir);

module.exports = rotas;