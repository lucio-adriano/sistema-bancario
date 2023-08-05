const bancodedados = require('../bancodedados');
let numero = 0;

function listarContas(req, res) {
  return res.status(200).json(bancodedados.contas);
}

function criarConta(req, res) {
  numero++
  const usuario = req.body
  const isValidoCpf = bancodedados.contas.some(conta => conta.usuario.cpf === usuario.cpf);
  const isValidoEmail = bancodedados.contas.some(conta => conta.usuario.email === usuario.email);
  const conta = {
    numero,
    saldo: 0,
    usuario
  }
  if(!isValidoCpf && !isValidoEmail) {
    bancodedados.contas.push(conta)
    return res.status(200).json(conta)
  }
  return res.status(400).json({ mensagem: 'Mensagem de erro' })
}

function atualizarUsuarioConta(req, res) {
  const numeroConta = req.params.numeroConta;
  const usuario = req.body;
  const contas = bancodedados.contas;
  const conta = contas.find(conta => Number(numeroConta) === conta.numero);

  const isValidoCpf = bancodedados.contas.some(conta => conta.usuario.cpf === usuario.cpf);
  const isValidoEmail = bancodedados.contas.some(conta => conta.usuario.email === usuario.email);
  console.log(isValidoCpf, isValidoEmail);

  if (conta !== undefined) {
    
    if (isValidoCpf) return res.status(400).json({ mensagem: "CPF já cadastrado" });
    if (isValidoEmail) return res.status(400).json({ mensagem: "Email já cadastrado" });

    if (usuario.cpf) conta.usuario.cpf = usuario.cpf;

    if (usuario.email) conta.usuario.email = usuario.email;

    if (usuario.nome) conta.usuario.nome = usuario.nome;

    if (usuario.data_nascimento) conta.usuario.data_nascimento = usuario.data_nascimento;

    if (usuario.telefone) conta.usuario.telefone = usuario.telefone;

    if (usuario.senha) conta.usuario.senha = usuario.senha;

    return res.status(201).json({ mensagem: "Conta atualizada com sucesso" });
  }
  return res.status(400).json({ mensagem: "Mensagem de erro" });
}

function excluirConta(req, res) {
  let contas = [];
  let isSaldoZero = false;
  const conta = bancodedados.contas.find(conta => conta.numero === Number(req.params.numeroConta));

  if (conta) {
    if (conta.saldo === 0) {
      isSaldoZero = true; 
    }else {
      return res.status(400).json({mensagem: "Saldo superior ao permitido para excluir"});
    }
  }

  if(isSaldoZero){
    contas = bancodedados.contas.filter(conta => conta.numero !== Number(req.params.numeroConta));
  }

  if (contas.length < bancodedados.contas.length && isSaldoZero) {
    bancodedados.contas = contas;
    return res.status(201).json({mensagem: "Conta excluida com sucesso"});
  }

  return res.status(400).json({mensagem: "Mensagem de erro"});
}

function consultarSaldo(req, res) {
  const { numero_conta, senha } = req.query;
  const contas = bancodedados.contas;
  for (const conta of contas) {
    if (conta.numero === Number(numero_conta) && conta.usuario.senha === senha) return res.status(200).json({saldo: Number(`${conta.saldo}`)});
  }
  if (numero_conta && senha) return res.status(400).json({mensagem: "Mensagem de erro"});
}

function extrato(req, res) {
  const { numero_conta, senha } = req.query;
  let isValido = false
  for (const conta of bancodedados.contas) {
    if (conta.numero === Number(numero_conta) && conta.usuario.senha === senha) isValido = true
  }
  if (isValido) {
    const { saques, depositos, transferencias } = bancodedados;
    const extrato = {
      depositos: depositos.filter(desposito => desposito.numero_conta === numero_conta),
      saques: saques.filter(saque => saque.numero_conta === numero_conta),
      transferenciasEnviadas: transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta),
      transferenciasRecebidas: transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    };
    return res.status(200).json(extrato);
  }
  return res.status(400).json({ mensagem: 'Mensagem do erro!' });
}

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  consultarSaldo,
  extrato
};
