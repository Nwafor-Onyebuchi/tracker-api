const jwt = require('jsonwebtoken')
const ErrorResponse = require ('../utils/errorResponse')
const User = require('../models/User')

 exports.protectRoutes = async (req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(new ErrorResponse('Unauthorized', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(new ErrorResponse('Server Error', 500))
    }
}