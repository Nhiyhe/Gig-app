/// <reference path="../typings/tsd.d.ts" />

module.exports = function(app){
    app.get('/gigs',function(req,res){
        res.send('Gig Page');
    })
};
