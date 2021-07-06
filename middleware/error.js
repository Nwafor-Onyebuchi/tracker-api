const errorHandler = (err, req, res, next) => {
    console.log(err.stack)

    res.status(err.statusCode || 500).json({
        error: true,
        message: err.message || 'Server Error'
    })
}

module.exports = errorHandler