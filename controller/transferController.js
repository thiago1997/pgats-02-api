const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json({ message: 'Transferência realizada', transfer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  res.json(transferService.listTransfers());
};
