const bancodedados = require('../bancodedados');

function depositar(req, res) {
  const dadoDeposito = req.body;
  const numeroConta = Number(dadoDeposito.numero_conta);
  const valor = Number(dadoDeposito.valor);

  const verificaContas = bancodedados.contas;
  const deposito = bancodedados.depositos;
  
  if (verificaContas) {
    const conta = verificaContas.find(conta => numeroConta === conta.numero);
    if (conta) {
      for (let i = 0; i < verificaContas.length; i++) {
        if (verificaContas[i].numero === numeroConta) {
          verificaContas[i].saldo += valor;
          dadoDeposito.data = new Date()
          deposito.push(dadoDeposito);
        }
      }
      return res.status(201).json({ mensagem: "Depósito realizado com sucesso" });
    }else{
      return res.status(404).json({ mensagem: "Mensagem de erro" });
    }
  }
}

// Sacar de uma conta bancária
function sacar(req, res) {
  // Implementar a lógica para sacar de uma conta bancária
}

// Transferir valores entre contas bancárias
function transferir(req, res) {
  // Implementar a lógica para transferir valores entre contas bancárias
}

// Exportar os controladores
module.exports = {
  depositar,
  sacar,
  transferir,
};
