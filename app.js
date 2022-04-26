
const express = require('express'),
  multer = require('multer'),
 // session = require('express-session'),
  app = express()

const routes = require('./routes/routes')
const path = require('path')
const config = require('./configurate/config.json')


const port = process.env.port || config.PORT


const start = () =>{
  try {
    app.listen(port, (req, res) =>{
      console.log('server started')
    })
  } catch (error) {
    console.log(error)
  }
}


const upload = multer({dest:"uploads"})
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "uploads")
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname)
  }
})
app.use(multer({storage:storageConfig}).array("filedata"))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

start()




