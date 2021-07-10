const express = require('express')
const { getUserTransactions, getUserTransaction, createTransaction, updateTransaction, deleteTransaction, getUserAllTransactions} = require('../controllers/transactions')
const {protectRoutes} = require('../middleware/auth')
const router = express.Router()

router.route('/user-transactions')
.get(protectRoutes, getUserTransactions)
.post(protectRoutes, createTransaction)

router.route('/transactions')
.get(getUserAllTransactions)

router.route('/user-transactions/:id')
.get(protectRoutes, getUserTransaction)
.put(protectRoutes, updateTransaction)
.delete(protectRoutes, deleteTransaction)

module.exports = router