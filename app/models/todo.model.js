var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model("Todo", TodoSchema);