const express = require('express')
const { getUserTransactions, getUserTransaction, createTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactions')

const router = express.Router()

router.route('/')
.get(getUserTransactions)
.post(createTransaction)

router.route('/:id')
.get(getUserTransaction)
.put(updateTransaction)
.delete(deleteTransaction)

module.exports = router