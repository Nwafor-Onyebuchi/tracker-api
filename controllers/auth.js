const User = require('../models/User')
const ErrorResponse = require ('../utils/errorResponse')
const sendEmail = require('../utils/sendEmails')

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) =>{
    try {

        const {name, email, password, role, } = req.body

        const user = await  User.create({
            name, 
            email, 
            password, 
            role,
        })

        // Create token
        const token = user.getSignedJweToken()

        res.status(200).json({
         error: false,
         message: 'Registration successful',
         token
     })

    } catch (error) {
        console.log(error)
        next( new ErrorResponse(`Server error`, 500))
       
    }
 
 }

 // @desc       Login User
// @route       POST /api/v1/auth/register
// @access      Public
exports.login = async (req, res, next) =>{
    try {

        const { email, password } = req.body

        // Validate email and password
        if(!email && !password) {
          return next(new ErrorResponse('Please provide email and password', 400) )
        }

        // Check for user
        const user = await User.findOne({email}).select('+password')

        if(!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password)

        if(!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        // Create token
        const token = user.getSignedJweToken()

        res.status(200).json({
         error: false,
         message: 'Login successful',
         token
     })

    } catch (error) {
        console.log(error)
        next( new ErrorResponse(`Server error`, 500))
        // res.status(400).json({error: true})
    }
 
 }

 // @desc        GET logged in User
// @route        GET /api/v1/auth/register
// @access       Public
exports.getAuthUser = async (req, res, next) =>{
    try {

        const user = await User.findById(req.user.id)

        res.status(200).json({
            error: false,
            data: user
        })

        next()

    } catch (error) {
        console.log(error)
        next( new ErrorResponse(`Server error`, 500))
       
    }
 
 }

// @desc        Forgot password
// @route       POST /api/v1/auth/register
// @access      Public
exports.forgotPassword = async (req, res, next) =>{
    try {

        const user = await User.findOne({email: req.body.email})

        if(!user) {
            return next (new ErrorResponse('Sorry, user does not exist.', 404))
        }

        const resetToken = await user.getRestPasswordToken()
        // console.log(resetToken)

       await user.save({validateBeforSave: false})

       const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`

       const message = `Hello ${user.name}, \n\nYou are recieving this email because you have requested for a reset of your password. Please make a PUT request to: \n\n ${resetUrl}`

       try {
           await sendEmail({
               email: user.email,
               subject: 'Password Reseet',
               message
           })

           res.status(200).json({error: false, message: 'Email sent'})
       } catch (error) {
           console.log(error)
           user.resetPasswordToken = undefined
           user.resetPasswordExpire = undefined
           await user.save({validateBeforSave: false})

           return next(new ErrorResponse(`Unable to send reset password token`, 500))
       }

        // res.status(200).json({
        //     error: false,
        //     data: user
        // })

        next()

    } catch (error) {
        console.log(error)
        next( new ErrorResponse(`Server error`, 500))
       
    }
 
 }



