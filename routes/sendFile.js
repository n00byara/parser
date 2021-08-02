const fs = require('fs');
const path = require('path');
let pathFile = path.resolve('./');
pathFile = pathFile.slice(0, pathFile.length);

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
    let file = path.join(pathFile + '/static/', url);
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


let sorting = () =>{
  const sorting = require(pathFile + '/modules/parser/files');
  let dis = sorting();
  delete require.cache[require.resolve(pathFile + '/modules/parser/files')];
  return dis;
};
exports.sorting = sorting;
