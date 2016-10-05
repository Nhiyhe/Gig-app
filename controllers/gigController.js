/// <reference path="../typings/tsd.d.ts" />

var Gig = require("../models/gig");
var Comment = require('../models/Comment');

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


    app.get('/gigs/:id', function(req,res){
        Gig.findById(req.params.id, function(err, foundGig){
            if(err){
                console.log(err);
            }else{
                res.render('gig/details',{gig:foundGig});
            }
        })
    })
   
   app.get('/gigs/:id/comment/new', function(req,res){
       Gig.findById(req.params.id, function(err, foundGig){
           if(err){
               console.log(err);
           }else{
                res.render('gig/comment',{gig:foundGig});
           }
       })
        
   });

   app.post('/gigs/:id/comment', function(req,res){
       Gig.findById(req.params.id, function(err, foundGig){
            if(err){
                console.log(err);
            }else{
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    }else{
                        foundGig.comments.push(comment);
                        foundGig.save();
                        res.redirect('/gigs');
                    }
                })
            }
       })
   });



    
};
