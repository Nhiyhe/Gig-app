/// <reference path="../typings/tsd.d.ts" />

var User = require('../models/user');
var Gig = require('../models/gig');

module.exports = function(app){

        app.get('/artists',function(req,res){
        User.find({},function(err,foundUsers){
            if(err){
                console.log(err);
            }else{
                res.render('artist/show',{Users:foundUsers});
            }
        })
        });

        app.get('/artist/myupcominggigs', function(req,res){
            Gig.find().where({'artist.id':req.user._id}).exec(function(err, gigs){
                if(err){
                    console.log(err);
                }else{
                    console.log(gigs);
                    res.render('gig/myupcominggigs',{gigs:gigs});
                }
            })
        });

        app.get("/artists/user/:id/profile", isLoggedIn,  function(req,res){
        User.findById(req.params.id, function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                res.render('artist/profile',{user:foundUser});
            }
        })
        });

        app.put('/artists/user/:id', isLoggedIn, function(req,res){
        
            User.findByIdAndUpdate(req.params.id, req.body.gig, function(err, updateUser){
                if(err){
                    console.log(err);
                }else{
                    res.redirect(`/artists/user/${req.params.id}/profile`)
                }
            })
        })

};

function isLoggedIn(req,res, next){
  if(req.isAuthenticated()){
      return next();
  }else{
      res.redirect('/login');
  }
};
