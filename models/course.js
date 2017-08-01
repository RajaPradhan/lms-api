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

  facets: {
    type: Array,
    required: true
  },

  pricing: {
    price: Number,
    offer: Number
  },

  batches: {
    type: Array
  }
});

mongoose.model('Course', courseSchema);
