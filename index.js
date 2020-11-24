// load the things we need
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mysql=require('mysql');
let rawdata = fs.readFileSync('json/games.json');
let gamesNames = JSON.parse(rawdata);

// create connection with database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shadowdb"
  })
  con.connect((err) => {
    if (err) {
      throw err
    }
    else {
      console.log("Connection is establish");
  
    }
  })
  global.db = con;
var paymentPage=false
app.use(express.static(path.join(__dirname, 'public')));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded());

// use res.render to load up an ejs view file

// home page
app.get('/', function(req, res) {
    res.render('home',{
        games:gamesNames
    });
});

// about page
app.get('/signup', function(req, res) {
    res.render('signup',{
        games:gamesNames,
        error:true
    });
});
app.get('/payment', function(req, res) {
    if(paymentPage==false){
        res.redirect('/signup')
    }
    else{
        res.render('payment',{
            games:gamesNames
        });
    }

});

app.post('/signup',function(req,res){
    if(req.method=='POST'){
        var firstName,lastName,emailAddress,password,gameSelection,termCheck
        if(checkValue(req,'firstName'))
        {
            firstName=req.body['firstName']
        }
        else{
            signupCall(res,false)
            return 0
        }
        if(checkValue(req,'lastName'))
        {
            lastName=req.body['lastName']
        }
        else{
            signupCall(res,false)
            return 0
        }
        if(checkValue(req,'emailAddress'))
        {
            emailAddress=req.body['emailAddress']
        }
        else{
            signupCall(res,false)
            return 0
        }
        if(checkValue(req,'password'))
        {
            password=req.body['password']
        }
        else{
            signupCall(res,false)
            return 0
        }
        if(checkValue(req,'gameSelection'))
        {
            gameSelection=req.body['gameSelection']
        }
        else{
            signupCall(res,false)
            return 0
        }
        if(checkValue(req,'termCheck'))
        {
            termCheck=req.body['termCheck']
        }
        else{
            signupCall(res,false)
            return 0
        }
        let myGameName=gamesNames.filter(i=>{
            if(i.id==gameSelection)
            return i
        });

var sql = `INSERT INTO users(Id, firstName, lastName, emailAddress, password, gameName) VALUES ('','${firstName}','${lastName}','${emailAddress}','${password}','${myGameName[0].title}')`;
        // console.log(sql);
try{
    db.query(`select * from users where emailAddress='${emailAddress}'`,function(err,rows,fields){
     if( !err&&rows.length){
        res.render('/signup',{
            games:gamesNames,
            error:err,
            user:'true'
        });
      }
      else{
        db.query(sql, function (err, rows, fields) {
            if (err) {
                signupCall(res,false)
            }
            else if (!err) {
                paymentPage=true;
                res.redirect('/payment');
            }
        })
      }
    })
}
catch(e){
    console.log(e);
}
     
    }
})
const port = process.env.port || 3000;
app.listen(port);
console.log(`server run on ${port}`);

const signupCall=function(res,err){
    res.render('signup',{
        games:gamesNames,
        error:err
    });
}

const checkValue=function(req,myVal){
   return req.body[myVal]!=undefined&&req.body[myVal]!=''&&req.body[myVal]!=null
}