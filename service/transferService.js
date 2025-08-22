const { transfers } = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer({ from, to, amount }) {
  if (!from || !to || typeof amount !== 'number') {
    throw new Error('Dados de transferência inválidos');
  }
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) {
    throw new Error('Usuário remetente ou destinatário não encontrado');
  }
  if (sender.saldo < amount) {
    throw new Error('Saldo insuficiente');
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos');
  }
  sender.saldo -= amount;
  recipient.saldo += amount;
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

function listTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  listTransfers
};
