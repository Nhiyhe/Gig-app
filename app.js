/// <reference path="./typings/tsd.d.ts" />

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose =   require('mongoose'),
    ArtistController = require('./controllers/artistController'),
    Gigcontroller = require('./controllers/gigController'),
    IndexController = require('./controllers/indexController'),
    seedDb        = require('./controllers/seedDB'),
    passport      = require('passport'),
    flash         = require('connect-flash'),
    toastr        = require('toastr'),
    methodOverride = require('method-override'),
    User          = require('./models/user'),
    Attendance    = require('./models/attendance'),
    LocalStrategy = require('passport-local').Strategy,
    session       = require('express-session'),

    app = express();
    
mongoose.Promise = global.Promise;

var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'my little secret for express session',
  resave: false,
  saveUninitialized: false
  
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    app.use(function(req,res,next){

        res.locals.currentUser = req.user;
        res.locals.err = req.flash('error');
        res.locals.success = req.flash('success');
        res.locals.toastr = toastr;
        return next();
    
    });

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

ArtistController(app);
Gigcontroller(app);
IndexController(app);
//seedDb();

mongoose.connect("mongodb://localhost/gig-app-db", function(err, result){
    if(err){
        console.log(err);
    }else{
        console.log(`Gig app Database is running`);
    }    
});

app.listen(PORT, function(){
    console.log(`Gig Server has Started on port ${PORT}`);
});