let path = require('path');
path = path.resolve('./');
const fs = require('fs');
const async = require('async');


let groups = () =>{
  let disciplines;
  let functionsArray = [];
  console.log(path)
  let files = JSON.parse(fs.readFileSync(path.slice(0, path.length) + '/files/files.txt', 'utf8'))

  for(let i = 0; i < files.length; i++){
    functionsArray.push(
      function(callback){
        let fileName = files[i];
        const sort = require('./sort');
        let groups = sort.getGroups(fileName);
        delete require.cache[require.resolve('./sort')];
        callback(null, groups);
      }
    );
  }

  async.parallel(functionsArray, 
  function(err, result){
    if(err) console.log(err);
    disciplines = result;
  });
  return disciplines;
};

module.exports = groups;














/*
let groups = () =>{
  let arr = [];

  for(let i = 0; i < files.length; i++){
    let fileName = files[i];
    module.exports = fileName;
    const sort = require('./sort');

    arr.push(sort.groups);
    delete require.cache[require.resolve('./sort')];
  }
  return arr;
};*/

//module.exports = groups;
