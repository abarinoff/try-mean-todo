var express = require("express");
var Todo = require('../models/todo.model');

var TodoRouter = express.Router();

TodoRouter.use(function(request, response, next) {
    console.log('### Operation with Todo ###');
    next();
});

TodoRouter.route("/todos")
    .get(function(request, response) {
        Todo.find(function(error, todos) {
            if (error) response.send(error);
            response.json(todos);
        });
    })
    .post(function(req, res) {
        console.log("text", req.body.text);
        var todo = new Todo({
            text: req.body.text,
            done: false
        });

        todo.save(function(err) {
            if(err) res.send(err);
            else Todo.find(function(err, todos) {
                if (err) res.send(err);
                res.json(todos);
            });
        })
    });

TodoRouter.route('/todos/:id')
    .get(function(req, res) {
        Todo.findById(req.params.id, function(err, todo) {
            if(err) res.send(err);
            else res.json(todo);
        });
    })
    .put(function(req, res) {
        Bear.findById(req.params.id, function(err, todo) {
            if(err) res.send(err);
            else {
                todo.text = req.body.text;
                todo.save(function(err) {
                    if (err) res.send(err);
                    else Todo.find(function(err, todos) {
                        if (err) res.send(err);
                        res.json(todos);
                    });
                });
            }
        });
    })
    .delete(function(req, res) {
        Todo.remove({
            _id: req.params.id
        }, function(err, todo) {
            if (err) res.send(err);
            else Todo.find(function(err, todos) {
                if (err) res.send(err);
                res.json(todos);
            })
        });
    });


module.exports = TodoRouter;