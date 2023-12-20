const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    requried: true
  },
  description: {
    type: String,
    requried: true
  }
});

module.exports = mongoose.model('Todo', todoSchema);