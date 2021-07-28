
const express = require('express');
const path = require('path');
const multer = require('multer');

const routes = require('./routes/routes');

let app = express();
app.set('port', 3000);


app.listen(app.get('port'), (req, res) =>{
  console.log('server has been started');
});



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


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);




