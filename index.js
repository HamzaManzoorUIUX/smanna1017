// load the things we need
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.urlencoded());
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
    res.render('pages/signup',{
        games:gamesNames
    });
});
app.post('/signup',function(req,res){
    if(req.method=='POST'){
        
    }
})
const port = process.env.port || 3000;
app.listen(port);
console.log(`server run on ${port}`);