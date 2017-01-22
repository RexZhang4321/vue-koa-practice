const db = require('../config/db.js'),
      todoModel = require('../schema/list.js');

const TodolistDb = db.mongoose;

const getTodoListByUsername = function* (user_name) {
    const todoList = yield todoModel.find({username: user_name});
    console.log(todoList);
    return todoList;
}

const createTodoList = function* (data) {
    const newTodo = todoModel({
        username: data.username,
        content: data.content,
        status: data.status
    });
    yield newTodo.save();
    return true;
}

module.exports = {
    getTodoListByUsername,
    createTodoList
}
