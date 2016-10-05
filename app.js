/// <reference path="./typings/tsd.d.ts" />

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose =   require('mongoose'),
    UserController = require('./controllers/userController'),
    Gigcontroller = require('./controllers/gigController'),
    seedDb        = require('./controllers/seedDB'),
    app = express();
    

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/gig-app-db", function(){
    console.log(`Gig app Database is running`);
});

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine','ejs');


UserController(app);
Gigcontroller(app);

seedDb();

app.get('/',function(req,res){
    res.render('landing');
});

app.listen(PORT, function(){
    console.log(`Gig Server has Started on port ${PORT}`);
});