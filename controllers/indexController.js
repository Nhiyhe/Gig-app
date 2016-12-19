
const User = require('../models/user');

module.exports = function(app){
passport      = require('passport');

        app.get('/',function(req,res){
        req.flash('success','Thanks for coming');
        res.render('landing');
        });

        app.get('/register', function(req,res){
        res.render('register');
        });

        app.post('/register', function(req,res){

        var newUser = new User({username:req.body.username, email:req.body.email });
        console.log(req.body.profile);
        User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
            passport.authenticate('local')(req, res, function(){
                    res.redirect('/gigs');
            } );
            
        });
        });


        app.get('/login',function(req,res){
        res.render('login');
        });

        app.post('/login', passport.authenticate('local',{successRedirect:'/gigs',failureRedirect:'/register'}), function(req,res){

        });

        app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
        });

}

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/register');
};