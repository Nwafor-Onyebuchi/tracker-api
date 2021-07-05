// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.createTransaction = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Add a transaction`})
}
// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.getUserTransactions = (req, res, next) =>{
    res.status(200).json({success: true, msg: 'Gets all user\'s transactions'})
}

// @desc        Create a transaction
// @route      POST /api/v1/user-transactions
// @access      Private
exports.getUserTransaction = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Gets transaction with ID ${req.params.id}`, user: req.user})
}

// @desc        Update a transaction
// @route       PUT /api/v1/user-transactions/:id
// @access      Private
exports.updateTransaction = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Updates transactions with ID ${req.params.id}`})
}

// @desc        Delete a transaction
// @route       DELETE /api/v1/user-transactions/:id
// @access      Private
exports.deleteTransaction = (req, res, next) =>{
    res.status(200).json({success: true, msg: `Delete transactions with ID ${req.params.id}`})
}