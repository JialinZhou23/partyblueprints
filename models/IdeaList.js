'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
var IdeaListSchema = new Schema({
  category: String,
  ideaList: String,
});

module.exports = mongoose.model('ideaList', IdeaListSchema);