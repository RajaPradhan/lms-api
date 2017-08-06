import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '../config/config.json';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: Number,
    required: true
  },

  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
};

userSchema.methods.isValidPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
  return hash === this.hash;
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  }, config.secretCode);
};

mongoose.model('User', userSchema);
