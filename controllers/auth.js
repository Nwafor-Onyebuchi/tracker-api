const User = require('../models/User')
const ErrorResponse = require ('../utils/errorResponse')

// @desc        Register User
// @route      POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) =>{
    try {

        const {name, email, password, role, } = req.body

        const user = await  User.create({
            name, email, password, role
        })
        res.status(200).json({
         error: false,
         message: 'Registration successful',
         data: user
     })
    } catch (error) {
        console.log(error)
        next( new ErrorResponse(`Something went wrong`, 500))
        // res.status(400).json({error: true})
    }
 
 }

