/// <reference path="./typings/tsd.d.ts" />

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose =   require('mongoose'),
    ArtistController = require('./controllers/artistController'),
    Gigcontroller = require('./controllers/gigController'),
    seedDb        = require('./controllers/seedDB'),
    passport      = require('passport'),
    User           = require('./models/user'),
    LocalStrategy = require('passport-local').Strategy,
    session       = require('express-session'),

    app = express();
    

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'my little secret for express session',
  resave: false,
  saveUninitialized: false
  
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/gig-app-db", function(){
    console.log(`Gig app Database is running`);
});

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine','ejs');


ArtistController(app);
Gigcontroller(app);

seedDb();

app.get('/',function(req,res){
    res.render('landing');
});

app.get('/register', function(req,res){
    res.render('register');
});

app.post('/register', function(req,res){

 var newUser = new User({username:req.body.username, email:req.body.email});

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
  res.send('your successfully logout');
});

app.listen(PORT, function(){
    console.log(`Gig Server has Started on port ${PORT}`);
});