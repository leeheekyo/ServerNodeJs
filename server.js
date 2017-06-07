var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var querystring = require('querystring');
var fs = require("fs")
var PORT = process.env.PORT || 3000;
var dateFormat = require('dateformat');

var MongoClient = require('mongodb').MongoClient;

var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    //BSON = require('mongodb').pure().BSON,
    assert = require('assert');

//db value

////ds161001.mlab.com:61001/kyo
/*var db = new Db('local', new Server('localhost', 27017));
db.open(function(err, db) {
  if(err) console.log(err);
  else console.log("db open");
})*/

/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds161001.mlab.com:61001/kyo');
var db = mongoose.connection;
db.once("open",function(){
	console.log("DB connected!");
});
db.on("error",function(err){
	console.log("DB ERROR : ", err);
});
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(PORT, function(){
 console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

// ./router/main.js 파일의 module.exports한 routing 정보를 router 변수에 담는다.
var router = require('./router/main')(app, fs);
