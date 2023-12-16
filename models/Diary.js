const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    requried: true
  },
  description: {
    type: String,
    requried: true
  },
  date: {
    type: Date,
    requried: true
  }
});

module.exports = mongoose.model('Diary', diarySchema);