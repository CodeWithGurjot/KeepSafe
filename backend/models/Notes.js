const mongoose = require('mongoose');
const { Schema } = mongoose

const NotesSchema = new Schema({
  //We are adding a user id field to notes
  //It will get a user id from user model and add it to this schema
  user:{
    type: mongoose.Schema.Types.ObjectId, //This means we are getting id from another schema
    ref:'user' //Refferencing to "model"
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('notes', NotesSchema)
