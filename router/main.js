// module.exports 는 모듈을 생성하는 부분으로 다른 파일에서 require 할 수 있다.

var User = require('./user.js');

module.exports = function(app, fs)
{

     app.get('/',function(req,res){
         res.render('main', {
             length: 10
         })
     });

     app.get('/main',function(req,res){
         res.render('main', {
             length: 10
         })
     });

     app.get('/profile',function(req,res){
         res.render('profile', {
             length: 10
         })
     });

     app.get('/login',function(req,res){
         res.render('login', {
             length: 10
         })
     });

     app.get('/board_add',function(req,res){
         res.render('board_add', {
             length: 10
         })
     });

     app.get('/QnA_add',function(req,res){
         res.render('QnA_add', {
             length: 10
         })
     });

     app.get('/board',function(req,res){
         res.render('board', {
             length: 10
         })
     });

     app.get('/QnA',function(req,res){
         res.render('QnA', {
             length: 10
         })
     });

    app.post('/loginok', function(req, res) {
        //post parameter passing
        console.log(req.body);
        
        User.find({ id: req.body.id, pw:req.body.pw }, function(err, user) {
            if(user != ""){
                res.end("<script>self.location='/'</script>")
            }
            else{
                res.end("There is no Information. Please retry it.");
            }
          });
        /*
        if(req.method =='POST') { 
            req.on('data', function(chunk) {
                console.log(chunk.toString()); 
                var data = querystring.parse(chunk.toString()); 
                res.writeHead(200, {'Content-Type':'text/html'}); 
                
                
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
        }*/
    });

}

/*
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
    //post parameter passing
    if(req.method =='POST') { 
        req.on('data', function(chunk) {
            console.log(chunk.toString()); 
            var data = querystring.parse(chunk.toString()); 
            res.writeHead(200, {'Content-Type':'text/html'}); 
            
            
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
});*/