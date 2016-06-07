var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
    text: String
});

var Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;