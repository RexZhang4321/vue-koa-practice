var mongoose = require('mongoose');
var User = require('./schema/user');

mongoose.connect('mongodb://localhost/vue-koa-demo-db');

// User.findOneAndUpdate({ username: 'rexz' }, { password: '76a2173be6393254e72ffa4d6df1030a' }, function(err, user) {
//   if (err) throw err;

//   // we have the updated user returned to us
//   console.log(user);
// });

// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});