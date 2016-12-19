/// <reference path="../typings/tsd.d.ts" />

var mongoose = require('mongoose');

var AttendanceSchema = new mongoose.Schema({

    gigs:{        
        type:mongoose.Schema.Types.ObjectId,
        ref:'Gig'
    },
        
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);