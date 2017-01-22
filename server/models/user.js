const db = require('../config/db.js'),
      User = require('../schema/user.js');

const TodolistDb = db.mongoose;

const getUserByUsername = function* (user_name) {
    const userinfo = yield User.find({username: user_name});
    console.log(userinfo);
    return userinfo[0];
}

module.exports = {
    getUserByUsername
}
