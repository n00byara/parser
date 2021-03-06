const fs = require('fs');
const path = require('path');
let pathFile = path.resolve('./');


exports.getContentType = getContentType;
function getContentType(url){
    switch(path.extname(url)){
      case ".html":
        return "text/html";
      case ".css":
        return "text/css";
      case ".js":
        return "text/javascript";
    }
}

exports.sendFile = sendFile;
function sendFile(url, contentType, res){
  let file = path.join(pathFile + '/static/', url)
    fs.readFile(file, (err, content) =>{
      if(err){
          res.writeHead(404);
          res.end('file not found))');
      } else{
          res.writeHead(200, {'Content-Type' : contentType});
          res.write(content);
          res.end();
      }
  });
}


let getTable = () =>{
  const getTable = require('../modules/parser/files');
  let dis = getTable();
  delete require.cache[require.resolve('../modules/parser/files')];
  return dis;
};
exports.getTable = getTable;
