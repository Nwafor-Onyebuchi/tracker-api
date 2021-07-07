const errorHandler = (err, req, res, next) => {

    let error = {...err}

    // Log error to the developer
    console.log(err.stack)

    res.status(err.statusCode || 500).json({
        error: true,
        message: err.message || 'Server Error'
    })
}

module.exports = errorHandler