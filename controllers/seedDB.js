var User = require('../models/user');
var Gig = require('../models/gig');
var Genre = require('../models/genre');

var Users = [{
    username:'James Watson',
    password:'password',
    profile:{
        image:'',
        hobbies:['singing','dancing','jumping']
    }
},

{
    username:'John Papa',
    password:'password',
    profile:{
        image:'',
        hobbies:['coding','camping','jumping']
    }    
},

{
    username:'Paul Smith',
    password:'password',
    profile:{
        image:'',
        hobbies:['kicking','humming','jumping']
    }
}
]

var Gigs = [{
    title:'dancing with the queen',
    venue:'Portland Ministry',
    eventDate:''

},

{
    title:'New year Party',
    venue:'manchester picadilly',
    eventDate:''   

}
]

var seedDb = function(){
  
  seedGigs();
  seedUsers();
  seedGenres();
};

var seedGigs = function(){
        Gig.remove({},function(err){
        console.log("Gigs removed...");
    if(err){
        console.log(err);
    }
    
    Gigs.forEach(function(gig){
        Gig.create(gig, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log('Gig created')
            }
        })
    }) 
    
    });

}

var seedUsers = function(){
     User.remove({},function(err, data){
 console.log('Data removed from db');
  
      Users.forEach(function(user){
        User.create(user, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log('data added');
            }
        })
    });

 });
}


var seedGenres = function(){
 Genre.remove({}, function(err){
     console.log('Data deleted');

       Genre.create([{name:'jazz'},{name:'blues'},{name:'country'}], function(err, genres){
      if(err){
          console.log(err);
      }else{
          console.log(genres);
      }
  });

 })
}

module.exports = seedDb;