const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb://localhost:27017/', { useUnifiedTopology: true });

let a = {
    _id: '1',
    name: 'admin',
    password: '121212',
};


mongoClient.connect((err, client) =>{

    const db = client.db('usersdb');
    const collection = db.collection('users');
    
    if(err) return console.log(err);
    
    collection.find().toArray((err, result) =>{
        client.close();
        if(err) throw err;
    
    });
});