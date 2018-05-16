require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const logger   = require('morgan')
const mongoose = require('mongoose')
const port     = process.env.PORT || 3000
mongoose.connect('mongodb://todofancy:fancytodo@ds113200.mlab.com:13200/todofancy')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const todoRouter = require('./routes/todo')

const app = express()

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success connect database')
})

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)

app.listen(port, () => {
  console.log(`Litening on port ${port}`)
})