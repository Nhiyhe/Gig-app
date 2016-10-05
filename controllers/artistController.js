/// <reference path="../typings/tsd.d.ts" />
var User = require('../models/user');

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



};
