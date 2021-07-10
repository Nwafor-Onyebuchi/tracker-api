const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email.'
        ]
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Encrypt password
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJweToken = function() {
    return jwt.sign({id: this._id,}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

UserSchema.methods.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
}

UserSchema.methods.getRestPasswordToken = async function () {
   const resetToken = crypto.randomBytes(20).toString('hex')

   // Hash token and set to it to resetPasswordToken
   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

   // Set expire
   this.resetPasswordExpire = Date.now() + 10 * 60 * 10000

   return resetToken
}



module.exports = mongoose.model('User', UserSchema)