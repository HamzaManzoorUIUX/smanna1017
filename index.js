// load the things we need
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mysql=require('mysql');
let rawdata = fs.readFileSync('json/games.json');
let gamesNames = JSON.parse(rawdata);

app.use(express.static(path.join(__dirname, 'public')));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded());

// use res.render to load up an ejs view file

// home page
app.get('/', function(req, res) {
    res.render('pages/home',{
        games:gamesNames
    });
});

// about page
app.get('/signup', function(req, res) {
    signupCall(res,false)
});
app.post('/signup',function(req,res){
    if(req.method=='POST'){
// console.log(req.body);
const firstName=checkData(req,res,'firstName')
const lastName=checkData(req,res,'lastName')
const emailAddress=checkData(req,res,'emailAddress')
const password=checkData(req,res,'password')
const termCheck=checkData(req,res,'termCheck')
    }
})
const port = process.env.port || 3000;
app.listen(port);
console.log(`server run on ${port}`);

const signupCall=function(res,err){
    res.render('pages/signup',{
        games:gamesNames,
        error:err
    });
}
const checkData=function(req,res,myVal){
    if(req.body[myVal])
    {
        return req.body[myVal]
    }
    else{
        signupCall(res,false)
    }
}