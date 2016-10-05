/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body:String,
    submittedOn:{
        type:Date,
        default:Date.now
    },

    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:String
    }
});

module.exports = mongoose.model('Comment',CommentSchema);
