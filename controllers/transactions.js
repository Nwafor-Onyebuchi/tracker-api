const Transaction = require('../models/Transactions')
const ErrorResponse = require ('../utils/errorResponse')

// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.createTransaction = async (req, res, next) =>{
   try {
    const transaction = await Transaction.create(req.body)

    res.status(200).json({
        error: false,
        message: 'Transaction successfully added.',
        data: transaction
    })
   } catch (error) {
       res.status(400).json({error: true})
   }

}
// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.getUserTransactions = async (req, res, next) =>{
    try {
        const transaction = await Transaction.find()
    
        res.status(200).json({
            count: transaction.length,
            error: false,
            data: transaction,
        })
       } catch (error) {
           res.status(400).json({error: true})
       }
}

// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.getUserTransaction = async (req, res, next) =>{
    try {
        const transaction = await Transaction.findById(req.params.id)

        if(!transaction){
            return next(new ErrorResponse(`Transaction with ID ${req.params.id} not found.`, 404))
        }
    
        res.status(200).json({
            error: false,
            data: transaction
        })
       } catch (error) {
           next(new ErrorResponse(`Transaction with ID ${req.params.id} not found.`, 404))
       }
}

// @desc        Update a transaction
// @route       PUT /api/v1/user-transactions/:id
// @access      Private
exports.updateTransaction = async (req, res, next) =>{
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if(!transaction){
            return res.status(400).json({
                error: true,
                message: `Transaction with ID ${req.params.id} not found.`
            })
        }
    
        res.status(200).json({
            error: false,
            data: transaction
        })
       } catch (error) {
           res.status(400).json({error: true})
       }
}

// @desc        Delete a transaction
// @route       DELETE /api/v1/user-transactions/:id
// @access      Private
exports.deleteTransaction = async (req, res, next) =>{
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id)

        if(!transaction){
            return res.status(400).json({
                error: true,
                message: `Transaction with ID ${req.params.id} not found.`
            })
        }
    
        res.status(200).json({
            error: false,
            data: {}
        })
       } catch (error) {
           res.status(400).json({error: true})
       }
}