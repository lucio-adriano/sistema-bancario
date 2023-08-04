const bancodedados = require('../bancodedados');

function depositar(req, res) {
  const dadoDeposito = req.body;
  const numeroConta = Number(dadoDeposito.numero_conta);
  const valor = Number(dadoDeposito.valor);

  let isSaldo = false

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

function sacar(req, res) {
  const saqueConta = req.body;
  let contas = bancodedados.contas;
  const saques = bancodedados.saques;

  const conta = bancodedados.contas.find(conta => {
    if(conta.numero === Number(saqueConta.numero_conta && saqueConta.senha === conta.usuario.senha)) return conta
  });
  if (conta) {
    isSaldo = conta.saldo >= Number(saqueConta.valor);
    if (isSaldo) {
      contas = bancodedados.contas.filter(conta => {
        if(conta.numero === Number(saqueConta.numero_conta)) {
          conta.saldo -= saqueConta.valor 
          return conta
        }else{
          return conta
        }
      })
      saques.push(
        {
          data: new Date,
          numero_conta: saqueConta.numero_conta,
          valor: saqueConta.valor
        }        
      ) 
      return res.status(201).json({ mensagem: "Saque realizado com sucesso" });
    }
    return res.status(400).json({ mensagem: "Mensagem de erro" });
  }
  return res.status(404).json({ mensagem: "Mensagem de erro" });
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
