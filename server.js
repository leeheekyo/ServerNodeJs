var PORT = process.env.PORT || 3000;

var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();

var dateFormat = require('dateformat');

//db value
var MongoClient = require('mongodb').MongoClient;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    //BSON = require('mongodb').pure().BSON,
    assert = require('assert');

////ds161001.mlab.com:61001/kyo
/*var db = new Db('local', new Server('localhost', 27017));
db.open(function(err, db) {
  if(err) console.log(err);
  else console.log("db open");
})*/


var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds161001.mlab.com:61001/kyo');
var db = mongoose.connection;
db.once("open",function(){
	console.log("DB connected!");
});
db.on("error",function(err){
	console.log("DB ERROR : ", err);
});


app.get('/', function(req, res){
    fs.readFile('views/main.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/main.html', function(req, res){
    fs.readFile('views/main.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/board_add.html', function(req, res){
    fs.readFile('views/board_add.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/board.html', function(req, res){
    fs.readFile('views/board_before.html', function(error,data_before){
        res.writeHead(200, {'Content-Type':'text/html'})
        
        //find DB and show
        var collection = db.collection("board");
        var data = data_before;
        collection.find().toArray(function(err, items) {
            assert.equal(null, err);
            //console.log(items[0]);
            var count = items.length;
            var i=0;
            var newData="";
            
            for(; i<count; i=i+1){
                newData=newData+"<tr><td>"+items[i]['id']+"</td><td>"+items[i]['title']+"</td><td>"+items[i]['day']+"</tr>";
            }
            data = data+newData+"</tbody></table></div><button type='button'' class='btn' onClick='addPage()'>새글 작성</button></div></div></div><footer class='container-fluid text-center'><p>Kyo World</p></footer><script>function addPage(){ self.location='board_add.html';}</script></body></html>";
            
            res.end(data);
            /*
            items.forEach(function(item){
                var adddata =
                console.log(adddata);
                data = data+adddata;
            })*/
            
            
            //db.close();
        })
        
    });
});
app.get('/QnA_add.html', function(req, res){
    fs.readFile('views/QnA_add.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/QnA.html', function(req, res){
    fs.readFile('views/QnA_before.html', function(error,data_before){
        res.writeHead(200, {'Content-Type':'text/html'})
        
        //find DB and show.
        var collection = db.collection("QnA");
        var data = data_before;
        collection.find().toArray(function(err, items) {
            assert.equal(null, err);
            //console.log(items[0]);
            var count = items.length;
            var i=0;
            var newData="";
            
            for(; i<count; i=i+1){
                newData=newData+"<tr><td>"+items[i]['id']+"</td><td>"+items[i]['title']+"</td><td>"+items[i]['day']+"</tr>";
            }
            data = data+newData+"</tbody></table></div><button type='button'' class='btn' onClick='addPage()'>QnA 작성</button></div></div></div><footer class='container-fluid text-center'><p>Kyo World</p></footer><script>function addPage(){ self.location='QnA_add.html';}</script></body></html>";
            
            res.end(data);
        })
        
    });
});
app.get('/admin.html', function(req, res){
    fs.readFile('views/admin.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/login.html', function(req, res){
    fs.readFile('views/login.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/profile.html', function(req, res){
    fs.readFile('views/profile.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/QnA.html', function(req, res){
    fs.readFile('views/QnA.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.post('/loginok', function(req, res) {
    /*if(req.method == 'GET') { 
        fs.readFile('./docRoot/form.html', function(err, data) { 
            res.writeHead(200, {'Content-Type':'text/html'}); 
            res.end(data); 
        }); 
    }*/
    //post parameter passing
    if(req.method =='POST') { 
        req.on('data', function(chunk) {
            console.log(chunk.toString()); 
            var data = querystring.parse(chunk.toString()); 
            res.writeHead(200, {'Content-Type':'text/html'}); 
            
            /*
            var myobj = { name: "Company Inc", address: "Highway 37" };
                db.collection("customers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 record inserted");
                db.close();
            });*/
            
            //check id and password
        var query = { id: data.id, pw : data.pw };
        db.collection("user").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            
            if(result=="") res.end("login fail");
            else {
                res.end("login success <script>self.location='/';</script>");
                
            }
        });
            
            
            
        }); 
    }

});
app.post('/board_add_ok', function(req, res) {
    
if(req.method =='POST') { 
    req.on('data', function(chunk) { 
        console.log(chunk.toString());
        
        
        
        var data = querystring.parse(chunk.toString()); 
        res.writeHead(200, {'Content-Type':'text/html'}); 
        
        //calculate id
        var query = {  };
        var boardCount = 0;
        db.collection("board").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            boardCount=result[result.length-1].id;
            console.log(boardCount);
        });
        boardCount+=1;
        
        //calculate date
        var date=dateFormat(result.request_date, "yyyy-mm-dd");
        console.log('[' + date + '] ' + '현재 시간')

        //insert board
        var myobj = { id:boardCount, title: data.title, body: data.body, day : date };
        db.collection("board").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            //db.close();
        });
        
        res.end('title : ' + data.title + ',body : ' + data.body); 
    });
}
});
app.post('/QnA_add_ok', function(req, res) {

if(req.method =='POST') { 
    req.on('data', function(chunk) { 
        console.log(chunk.toString());
        
        
        
        var data = querystring.parse(chunk.toString()); 
        res.writeHead(200, {'Content-Type':'text/html'}); 
        
        //calculate id
        var query = {  };
        var boardCount = 0;
        db.collection("QnA").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            boardCount=result[result.length-1].id;
            console.log(boardCount);
        });
        boardCount+=1;
        
        //calculate date
        var date=dateFormat(result.request_date, "yyyy-mm-dd");
        console.log('[' + date + '] ' + '현재 시간')

        //insert QnA
        var myobj = { id:boardCount, title: data.title, body: data.body, day : date };
        db.collection("QnA").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            //db.close();
        });
        
        res.end('title : ' + data.title + ',body : ' + data.body); 
    });
}
});

app.listen(PORT, function(){
    console.log("server Start.")
});


/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

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
*/