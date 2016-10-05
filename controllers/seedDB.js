var User = require('../models/user');
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

var seedDb = function(){
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

};

module.exports = seedDb;