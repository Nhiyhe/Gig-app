/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
    lastLogin:{type:Date},
    profile:{
        image:String,
        hobbies:[
            {
                type:String,
            }
        ]
    },
    myUpcomingGigs:[
     {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Gig'
     }
    ],

    gigsAmGoing:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Gig'
        }
    ]
});

var options =[{lastLoginField:UserSchema.lastLogin},{errorMessages:[{UserExistsError :'won ti lo oo'}]}]
UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema);