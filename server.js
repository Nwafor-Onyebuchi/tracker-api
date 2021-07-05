const express = require('express')
const dotenv = require('dotenv')
const morgam = require('morgan')

//Route file 
const transactions = require('./routes/transactions')

// Load env vars
dotenv.config({path: './config/config.env'})

const app = express()

// dev logging
if(process.env.NODE_ENV==='development') {
    app.use(morgam('dev'))
}

// Mount routes
app.use('/api/v1/user-transactions', transactions)

const PORT = process.env.PORT

app.listen(PORT, ()=>console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))