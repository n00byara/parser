
const express = require('express'),
  multer = require('multer'),
  session = require('express-session'),
  app = express();

const routes = require('./routes/routes');
const path = require('path');

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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);




