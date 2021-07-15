const {Schema, model} = require('mongoose');


const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pass:{
        type: String,
        required: true,
    }

});

module.exports = model('user', schema);