const express = require('express')
const { register, login, getAuthUser, forgotPassword } = require('../controllers/auth') 


const router = express.Router()

const {protectRoutes} = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/authUser', protectRoutes, getAuthUser)
router.post('/forgotpassword', forgotPassword)

module.exports = router