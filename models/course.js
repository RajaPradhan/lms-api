import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  lname: {
    type: String,
    required: true
  },

  desc: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  pricing: {
    price: Number,
    offer: Number
  }
});

mongoose.model('Course', courseSchema);
