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

  const conta = contas.find(conta => {
    if(conta.numero === Number(saqueConta.numero_conta) && Number(saqueConta.senha) === conta.usuario.senha) return conta
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

function transferir(req, res) {
  const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;
  const contas = bancodedados.contas;
  const transferencias = bancodedados.transferencias;

  const contaOrigem = bancodedados.contas.find(conta => {
    if(conta.numero === Number(numero_conta_origem)
    && senha === conta.usuario.senha
    && Number(valor) < conta.saldo) return conta
  });

  const contaDestino = bancodedados.contas.find(conta => conta.numero === Number(numero_conta_destino));

  if (contaOrigem && contaDestino) {

    for (let i = 0; i < bancodedados.contas.length; i++) {
      if (bancodedados.contas[i] === contaOrigem) {
        bancodedados.contas[i].saldo -= valor;
      }
    }
    for (let i = 0; i < bancodedados.contas.length; i++) {
      if (bancodedados.contas[i] === contaDestino) {
        bancodedados.contas[i].saldo += valor;
      }
    }
    transferencias.push({
      data: new Date(),
      numero_conta_origem,
      numero_conta_destino,
      valor
    })
    return res.status(201).json({ mensagem: "Transferência realizado com sucesso" });
    
  }
  return res.status(400).json({ mensagem: "Mensagem de erro" });  
}

module.exports = {
  depositar,
  sacar,
  transferir,
};