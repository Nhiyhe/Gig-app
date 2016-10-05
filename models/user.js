/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username:String,
    password:String,
    profile:{
        image:String,
        hobbies:[
            {
                type:String,
            }
        ]
    }
});

module.exports = mongoose.model('User', UserSchema);