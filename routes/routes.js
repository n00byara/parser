const { Router } = require('express')
const router = Router()


const getContentType = require('./sendFile').getContentType
const sendFile = require('./sendFile').sendFile
const getTable = require('./sendFile').getTable


const fs = require('fs')

router.get('/', (req, res) =>{
    sendFile('main.html', 'text/html', res)
});

router.get('/downloads', (req, res) =>{
    sendFile('downloads.html', 'text/html', res)
});

router.get('/downloadFiles', (req, res) =>{
    let files = fs.readdirSync('./uploads')
    res.end(JSON.stringify(files))
});

router.get('/users', (req, res) =>{
    res.end(users.user())
});

router.get('/viewing', (req, res) =>{
    sendFile('result.html', 'text/html', res)
}); 

router.get('/parse', (req, res) =>{
    let disciplines = getTable()
    res.end(JSON.stringify(disciplines))
});

router.post('/upload', (req, res) =>{

    let files = []
    if(req.files){
        for(let i = 0; i < req.files.length; i++){
            files.push(req.files[i].filename)
        }
        fs.writeFileSync('../files/files.txt', JSON.stringify(files))
            res.send('file upload')
        } else{
            if(req.body){
            if(typeof req.body.data == 'string') files.push(req.body.data)
            else files = req.body.data
            fs.writeFileSync('../files/files.txt', JSON.stringify(files))
            sendFile('result.html', 'text/html', res)
        }
    }   
});

router.use((req, res) =>{
    sendFile(req.url, getContentType(req.url), res)
})
  
module.exports = router
