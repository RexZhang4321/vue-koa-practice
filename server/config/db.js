var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost/vue-koa-demo-db');

module.exports = {
    mongoose
}
