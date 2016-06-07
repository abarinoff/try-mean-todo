var express = require("express");
var Todo = require('../models/todo.model');

var TodoRouter = express.Router();

TodoRouter.use(function(request, response, next) {
    console.log('Operation with Todo');
    next();
});

TodoRouter.route("/api/todos")
    .get(function(request, response) {
        Todo.find(function(error, todos) {
            if (error) response.send(error);
            response.json(todos);
        });
    }).post(function(request, response) {
        Todo.create({
            text : req.body.text,
            done : false
        }, function(error, todo) {
            if (error) response.send(error);

            Todo.find(function(error, todos) {
                if (error) response.send(error)
                response.json(todos);
            });
        });
     });/*.delete(function(request, response) {
        Todo.remove({
            _id : request.params.todo_id
        }, function(err, todo) {
            if (err) response.send(err);

            Todo.find(function(error, todos) {
                if (error) response.send(error)
                response.json(todos);
            });
        });
}   );*/
