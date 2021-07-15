const mongoose = require('mongoose');
const user = require('./user.js');


async function getUser(login){
    conn = await mongoose.connect('mongodb://localhost:27017/usersdb', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    
    let arr = await user.findOne({name: login});
    mongoose.connection.close();
    return arr;
    //if(arr) console.log(arr + '  true');
    //console.log(arr + '   false')
}

exports.getUser = getUser;