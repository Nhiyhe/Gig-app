/// <reference path="../typings/tsd.d.ts" />

var Gig = require("../models/gig");
var Comment = require('../models/Comment');
var Genres = require("../models/genre");
var Attendance = require("../models/attendance");
var User      = require("../models/user");

var bodyParser = require('body-parser');

module.exports = function(app){

    app.use(bodyParser.urlencoded({extended:true}));    
    app.use(bodyParser.json());

    app.get('/gigs/user/:id/attending', function(req,res){
        User.findById(req.params.id).populate('gigsAmGoing').exec(function(err, gigs){
            if(err){
                console.log(err);
            }else{
                res.render('gig/attendance',{gigs:gigs});
            }
        });
    });

    app.get('/gigs',function(req,res){
        Gig.find({}).populate('genre').exec(function(err, gigs){
            if(err){
                console.log(err);
            }else{               
                res.render('gig/index',{gigs:gigs});                
            }
        });        
    });

    app.get('/gigs/new', isLoggedIn, function(req,res){
            Genres.find({},function(err, genres){
                if(err){
                    console.log(err);
                }else{                    
                    res.render('gig/new',{genres:genres});
                }
            });
    });
   
   app.post('/gigs/new', isLoggedIn, function(req,res){
     var author = {
         id:req.user._id,
         username:req.user.username
     };     
     var gig = {title:req.body.gig.title, venue:req.body.gig.venue, eventDate:req.body.gig.eventDate, 
         genre:req.body.gig.genre, artist:author};
     Gig.create(gig, function(err, data){
         if(err){
             console.log(err);
         }else{             
             res.redirect('/gigs');
         }
     });
   });

    app.get('/gigs/:id', function(req,res){
        Gig.findById(req.params.id).populate("comments").exec(function(err, foundGig){
            if(err){
                console.log(err);
            }else{
                res.render('gig/show',{gig:foundGig});
            }
        });
    });
   
   app.get('/gigs/:id/comment/new', isLoggedIn, function(req,res){
       Gig.findById(req.params.id, function(err, foundGig){
           if(err){
               console.log(err);
           }else{
                res.render('gig/comment',{gig:foundGig});
           }
       });       
   });

   app.post('/gigs/:id/comment', isLoggedIn, function(req,res){
       Gig.findById(req.params.id, function(err, foundGig){
            if(err){
                console.log(err);
            }else{
                                       
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    }else{
                         var author ={
                            id:req.user._id,
                            username:req.user.username
                        };
                        comment.author = author;
                        comment.save();
                        foundGig.comments.push(comment);
                        foundGig.save();
                        res.redirect('/gigs/'+ req.params.id);
                    }
                });
            }
       });
   });

   
    app.post('/gigs/:id/attendance', isLoggedIn, function(req,res){
        var attendance = {
            users:req.user._id,
            gigs:req.params.id
        };        
         User.findById(req.user._id, function(err,foundUser){
             if(err){
                 console.log(err);
             }else{

             Gig.findById(req.params.id, function(err, gig){
                       if(err){
                           console.log(err)
                       }else{

                    foundUser.gigsAmGoing.push(gig);
                    foundUser.save();
                    res.redirect('/gigs');
                       }
                   });
                   
             };
         });
        
    });

    app.post('/user/attending/gigs/:id/remove', isLoggedIn, function(req, res){
        User.findById(req.user._id, function(err, foundUser){
            if(err){
            console.log(err)
            }else{
                foundUser.gigsAmGoing.remove({_id:req.params.id});
                foundUser.save();
                res.redirect('/gigs');
            }

        });   

    });
};

var isLoggedIn = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/register');
};


