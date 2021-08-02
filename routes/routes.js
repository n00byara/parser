const { Router } = require('express');
const router = Router();
const getContentType = require('./sendFile').getContentType;
const sendFile = require('./sendFile').sendFile;
const sorting = require('./sendFile').sorting;
const fs = require('fs');
let path = require('path').resolve('./');
path = path.slice(0, path.length);
const getUser = require(path + '/modules/authorization/mongoose').getUser;
//console.log(path + '/uploads')
//console.log(fs.readFileSync(path + '/uploads/1.xls'))
router.get('/', (req, res) =>{
    sendFile('main.html', 'text/html', res);
});

// router.post('/login', (req, res) =>{
//     getUser(req.body.login).then(getAcces);

//     function getAcces(user) {
//         if(user){
//             if(user.password == req.body.password){
//                 sendFile('main.html', 'text/html', res);
//             } else{
//                 res.end('bad pass');
//             }
//         } else{
//             res.end('bad loggin');
//         }
//     }
    
// });

// router.get('/main', async (req, res) =>{
//     let func = (arg) =>{
//         if(arg){
//             sendFile('main.html', 'text/html', res);
//         } else{
//             res.end('login error');
//         }
//     }
//     getUser('admin').then(func); 
// });

router.get('/downloads', (req, res) =>{
    sendFile('downloads.html', 'text/html', res);
});

router.get('/downloadFiles', (req, res) =>{
    let files = fs.readdirSync('./uploads');
    res.end(JSON.stringify(files));
});

router.get('/users', (req, res) =>{
    res.end(users.user());
});

router.get('/viewing', (req, res) =>{
    sendFile('result.html', 'text/html', res);
}); 

router.get('/parse', (req, res) =>{
    let disciplines = sorting();
    res.end(JSON.stringify(disciplines));
});

router.post('/upload', (req, res) =>{

    let files = [];
    if(req.files){
        for(let i = 0; i < req.files.length; i++){
            files.push(req.files[i].filename);
        }
        fs.writeFileSync(path + '/files/files.txt', JSON.stringify(files));
            res.send('file upload');
        } else{
            if(req.body){
            if(typeof req.body.data == 'string') files.push(req.body.data);
            else files = req.body.data;
            fs.writeFileSync(path + '/files/files.txt', JSON.stringify(files));
            sendFile('result.html', 'text/html', res);
        }
    }   
});

router.use((req, res) =>{
    sendFile(req.url, getContentType(req.url), res)
});

  
module.exports = router;
