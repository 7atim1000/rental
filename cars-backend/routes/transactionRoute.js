const express = require('express');
const { addTransaction, getTransactions, removeTransaction } = require('../controllers/transactionController');

const router = express.Router();


router.post('/add-transaction', addTransaction)
router.post('/get-transactions', getTransactions)
router.post('/remove', removeTransaction)

module.exports = router; 