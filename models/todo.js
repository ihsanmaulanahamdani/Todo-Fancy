const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  todo: {
    type: String,
    required: [true, 'please write something todo']
  },
  estimated_time: Date,
  status: String
}, {
  timestamps: true
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo