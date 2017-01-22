const todolist = require('../controller/todolist.js')
const router = require('koa-router')();

todolist(router);

module.exports = router;
