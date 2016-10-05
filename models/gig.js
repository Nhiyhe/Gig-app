/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');

var GigSchema = mongoose.Schema({
    title:String,
    venue:String,
    createdOn:{
        type:Date,
        default:Date.now
    },
    eventDate:{
        Type:Date
    },

    comments:[
     {
     type:mongoose.Schema.Types.ObjectId,
     ref:'Comment'
   }
    ]
});

module.exports = mongoose.model('Gig',GigSchema);