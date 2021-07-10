const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title for your transaction']
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount']
    },
    isCash: {
        type: Boolean,
        required: false,
        default: true
    },
    type: {
        type: String,
        required: [true, 'Please send a transaction type']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Transaction', TransactionSchema)