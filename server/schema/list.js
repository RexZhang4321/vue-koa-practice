var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  status: Number,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
listSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// we need to create a model using it
var List = mongoose.model('List', listSchema);

// make this available to our users in our Node applications
module.exports = List;
