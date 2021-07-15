
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const fileupload = require('express-fileupload');
const multer = require('multer');
const mongo = require('./modules/authorization/mongo');

let app = express();
app.set('port', 3000);

const upload = multer({dest:"uploads"});
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});
app.use(multer({storage:storageConfig}).array("filedata"));


http.createServer(app).listen(app.get('port'), () =>{
  console.log('server has been started');
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) =>{
  sendFile('index.html', 'text/html', res);
});

app.get('/downloads', (req, res) =>{
  sendFile('downloads.html', 'text/html', res);
});

const users = require('./modules/authorization/users');

app.get('/users', (req, res) =>{
  console.log(users.user());
  res.end(users.user());
});

app.get('/downloadFiles', (req, res) =>{
  let files = fs.readdirSync('./uploads');
  res.end(JSON.stringify(files));
});

app.post('/upload', (req, res) =>{

  let files = [];
  if(req.files){
    for(let i = 0; i < req.files.length; i++){
      files.push(req.files[i].filename);
    }
    fs.writeFileSync('./files/files.txt', JSON.stringify(files));
    res.send('file upload');
  } else{
    if(req.body){
      if(typeof req.body.data == 'string') files.push(req.body.data);
      else files = req.body.data;
      fs.writeFileSync('./files/files.txt', JSON.stringify(files));
      sendFile('result.html', 'text/html', res);
    }
  }
});

app.get('/viewing', (req, res) =>{
  sendFile('result.html', 'text/html', res);
});

app.get('/parse', (req, res) =>{
  let disciplines = sorting();
  res.end(JSON.stringify(disciplines));
});

app.use((req, res) =>{
  sendFile(req.url, getContentType(req.url), res);
});

function sendFile(url, contentType, res){
  let file = path.join(__dirname + '/static/', url);
  fs.readFile(file, (err, content) =>{
      if(err){
        res.writeHead(404);
        res.end('file not found');
      }
      else{
        res.writeHead(200, {'Content-Type' : contentType});
        res.write(content);
        res.end();
      }
  });
}

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

let sorting = () =>{
  const sorting = require('./modules/parser/files');
  let dis = sorting();
  delete require.cache[require.resolve('./modules/parser/files')];
  return dis;
};
