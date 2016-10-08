/// <reference path="../typings/tsd.d.ts" />

var Gig = require("../models/gig");
var Comment = require('../models/Comment');
var Genres = require("../models/genre");
module.exports = function(app){

    
    app.get('/gigs',function(req,res){
        Gig.find({}).populate('genre').exec(function(err, gigs){
            if(err){
                console.log(err);
            }else{
                console.log(gigs);
                res.render('gig/show',{gigs:gigs});
                
            }
        })
        
    });

    app.get('/gigs/new',function(req,res){
            Genres.find({},function(err, genres){
                if(err){
                    console.log(err);
                }else{
                    res.render('gig/new',{genres:genres});
                }
            })
    });
   
   app.post('/gigs/new', function(req,res){
    
     Gig.create(req.body.gig, function(err, data){
         if(err){
             console.log(err);
         }else{
             res.redirect('/gigs');
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
