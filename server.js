const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const todoRoute = require('./routes/todoRoute')
const PORT = process.env.PORT || 5000
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on ${PORT}`)
        })
    })

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', todoRoute)


