/// <reference path="../typings/tsd.d.ts" />

var Gig = require("../models/gig");

module.exports = function(app){
    app.get('/gigs',function(req,res){
        Gig.find({}, function(err, gigs){
            if(err){
                console.log(err);
            }else{
                res.render('gig/show',{gigs:gigs});
            }
        })
        
    });


    app.get('/gig/:id', function(req,res){
        Gig.findById(req.params.id, function(err, foundGig){
            if(err){
                console.log(err);
            }else{
                res.render('gig/details',{gig:foundGig});
            }
        })
    })






    
};
