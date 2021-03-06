const express = require('express')
const dotenv = require('dotenv')
const morgam = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const {protectRoutes} = require('./middleware/auth')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to DB
connectDB()

//Route file 
const transactions = require('./routes/transactions')
const auth = require('./routes/auth')

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())


// dev logging
if(process.env.NODE_ENV==='development') {
    app.use(morgam('dev'))
}

// Mount routes
app.use('/api/v1', transactions)
app.use('/api/v1/auth', auth)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`)

    server.close(()=>process.exit())
})