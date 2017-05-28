var PORT = process.env.PORT || 3000;

var express = require('express');
var fs = require("fs");
var app = express();

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

var db = new Db('local', new Server('localhost', 27017));
db.open(function(err, db) {
  if(err) console.log(err);
  else console.log("db open");
})

app.get('/', function(req, res){
    fs.readFile('main.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/main.html', function(req, res){
    fs.readFile('main.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/board_add.html', function(req, res){
    fs.readFile('board_add.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/board.html', function(req, res){
    fs.readFile('board_before.html', function(error,data_before){
        res.writeHead(200, {'Content-Type':'text/html'})
        
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
app.get('/QnA.html', function(req, res){
    fs.readFile('QnA_before.html', function(error,data_before){
        res.writeHead(200, {'Content-Type':'text/html'})
        
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
    fs.readFile('admin.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/login.html', function(req, res){
    fs.readFile('login.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/profile.html', function(req, res){
    fs.readFile('profile.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.get('/QnA.html', function(req, res){
    fs.readFile('QnA.html', function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(data);
    });
});
app.post('/loginok', function(req, res) {
    console.log("post received: %s %s", req.query.id, req.query);
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