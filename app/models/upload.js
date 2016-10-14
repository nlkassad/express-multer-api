'use strict';

const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

UploadSchema.virtual('length').get(function () {
  return this.text.length;
});

const Upload = mongoose.model('Upload', UploadSchema);

module.exports = Upload;
