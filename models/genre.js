/// <reference path="../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var GenreSchema = new mongoose.Schema({
    name:String
});

module.exports = mongoose.model("Genre", GenreSchema);