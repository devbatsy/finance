const http = require('http')
const express = require('express');
const path = require('path');
const app = express()
const server = http.createServer(app);
const body = require('body-parser');
const urlencoded = body.urlencoded({extended:false});
const fs = require('fs')

app.use(express.static(__dirname));

app.use(body.json());

app.get('/' , (req,res) =>{
    res.sendFile(path.join(__dirname , './index.html'))
})

app.post('/update' ,urlencoded, (req,res) =>{
    const data = req.body;

    try{
        const report = fs.writeFileSync(path.join(__dirname , 'file.json') , JSON.stringify(data.data));
        res.json({status:true})
    }catch(err)
    {
        res.json({status:false})
    }
})

server.listen(8080)