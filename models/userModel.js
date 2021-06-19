const mongoose = require('mongoose');

// Validate our users information
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 15,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  addressOne: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  addressTwo: {
    type: String,

    trim: true,
    maxLength: 35,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxLength: 35,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxLength: 15,
  },
  zip: {
    type: Number,
    required: true,
    trim: true,
    min: 9999,
    max: 1000000000,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
