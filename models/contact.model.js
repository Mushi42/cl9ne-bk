const mongoose = require('mongoose');

/*
name
email 
message
phone
subject

*/ 

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const Schema = mongoose.model('contact', schema);
module.exports = Schema;
