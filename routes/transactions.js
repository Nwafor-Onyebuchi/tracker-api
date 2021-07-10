const express = require('express')
const { getUserTransactions, getUserTransaction, createTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactions')
const {protectRoutes} = require('../middleware/auth')
const router = express.Router()

router.route('/')
.get(protectRoutes, getUserTransactions)
.post(protectRoutes, createTransaction)

router.route('/:id')
.get(protectRoutes, getUserTransaction)
.put(protectRoutes, updateTransaction)
.delete(protectRoutes, deleteTransaction)

module.exports = router