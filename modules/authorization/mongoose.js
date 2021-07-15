const mongoose = require('mongoose');
const user = require('./user.js');


async function getUser(login){
    conn = await mongoose.connect('mongodb://localhost:27017/usersdb', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log('логин в мангусе: ' + login);
    let userData = await user.findOne({name: login});
    mongoose.connection.close();
    return userData;
}

exports.getUser = getUser;