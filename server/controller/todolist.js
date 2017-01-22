const todolist = require('../models/todolist.js')

const getTodolist = function* () {
    const user_name = this.params.username;
    const result = yield todolist.getTodoListByUsername(user_name);
    this.body = result;
}

const createTodolist = function* () {
    const data = this.request.body;
    const result = yield todolist.createTodoList(data);
    this.body = {
        success: true
    };
}

module.exports = (router) => {
    router.get('/todolist/:username', getTodolist),
    router.post('/todolist', createTodolist)
}
