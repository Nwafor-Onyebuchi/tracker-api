const express = require('express')
const { register, login, getAuthUser } = require('../controllers/auth') 


const router = express.Router()

const {protectRoutes} = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/authUser', protectRoutes, getAuthUser)

module.exports = router