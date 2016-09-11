const express = require("express");
//const app = express();

//var server = require('http').createServer(app);
//var io = io.listen(server);

var app = express();

var http = require('http');

var server = http.createServer(app);
var io = require('socket.io')(server);

/*server.listen(app.get('port'), app.get('ipaddress'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});*/

var monk = require("monk");
var db = monk("localhost:27017/userDatabase");
var connected = [];
var disconnected = [];

//var server = require('http').createServer(app);

var bodyParser = require("body-parser");

app.use('/img', express.static(__dirname + "/img"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/js', express.static(__dirname + "/js"));
app.use('/controllers', express.static(__dirname + "/controllers"));
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.sendFile(__dirname + "/index.html");
})

app.get('/index.html', function(request, response){
  response.sendFile(__dirname + "/index.html");
})

app.get('/searchResults.html', function(request, response){
  response.sendFile(__dirname + "/searchResults.html");
});

app.get('/signup.html', function(request, response){
  response.sendFile(__dirname + "/signup.html");
});

app.get('/profile.html', function(request, response){
  response.sendFile(__dirname + "/profile.html");
});

app.get('/viewProfile.html', function(request, response){
  response.sendFile(__dirname + "/viewProfile.html");
});

app.get('/map.html', function(request, response){
  response.sendFile(__dirname + "/map.html");
})

app.get('/users', function(req,res){
  //console.log("enter users");
  var users = db.get("users");
  users.find({},function(err, users){
    if(err)
      throw err
    else{
      res.json(users);
      console.log(users);
    }
});
});

app.get('/onlineusers', function(req,res){
  //console.log("enter users");
  var users = db.get("users");
  users.find({online:"true"},function(err, users){
    if(err)
      throw err
    else
      res.json(users);
});
});

app.get('/user/:username', function(req,res){
  var users = db.get('users');
  users.find({username : req.params.username}, function(err, user){
    if(err)
      throw err;
    else{
      res.json(user);
    }
      //console.log(res.json(user));
  });
});

app.put('/user/:username', function(req,res){
  var users = db.get('users');
  users.update({username : req.params.username},
    {$set:{online: "true"}},
  function(err, user){
    if (err)
      throw err;
    else
      res.json(res);
    });
});

app.put('/useronline/:username', function(req,res){
  var users = db.get('users');
  users.update({username : req.params.username},
    {$set:{online: req.body.online}},
  function(err, user){
    if (err)
      throw err;
    else{
      res.json(user);
      if(req.body.online==='true'){
        connected.push(req.params.username);
      }
      else{
          disconnected.push(req.params.username);
          function isUser(value) {
            return value !== req.params.username;
          }
          connected = connected.filter(isUser);
          console.log(connected);
          io.sockets.emit('disconnected', disconnected);
      }
    }
    });
});

app.put('/onlineuser/:username', function(req,res){
  var users = db.get('users');
  users.update({username : req.params.username},
    {$set:{visited_places : req.body.visited_places}},
    function(err, user){
      if(err)
        throw err;
      else
        res.json(res);
    });
});

app.post('/addUser', function(req, res){
  /*db.users.insert(req.body, function(err, user){
    res.json(doc);
  });*/
  console.log(req.body);
  var users = db.get('users');
  users.insert(req.body, function(err, user){
      res.json(user);
  })
});

app.post('/addPost', function(req, res){
  var posts = db.get('posts');
  posts.insert(req.body, function(err, user){
    io.sockets.emit('post added', req.body);
    res.json(user);
  })
});

app.get('/getpost/:post_by/:time', function(req,res){
  var posts = db.get('posts');
  posts.find({post_by : req.params.post_by, time: req.params.time}, function(err, post){
    if(err)
      throw err;
    else{
      res.json(post);
      console.log(post);
    }
      //console.log(res.json(user));
  });
});

app.put('/update_likepost/:username', function(req,res){
    var users = db.get('users');
    users.update({username : req.params.username},
      { $set : { likes : req.body.likes }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});

app.get('/likes/:postid', function(req,res){
  var posts = db.get('posts');
  posts.find({_id : req.params.postid}, function(err, post){
    if(err)
      throw err;
    else{
      res.json(post);
    }
      //console.log(res.json(user));
  });
});

app.put('/updatelikes/:postid', function(req,res){
    var posts = db.get('posts');
    posts.update({_id : req.params.postid},
      { $set : { likes : req.body.likes }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});

app.put('/likepost/:postid', function(req,res){
    var posts = db.get('posts');
    posts.update({_id : req.params.postid},
      { $inc : { no_likes : 1 }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});

/*app.put('/likebutton/:postid', function(req,res){
    var posts = db.get('posts');
    posts.update({_id : req.params.postid},
      { $set : { button : 'Liked' }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});*/

app.put('/unlikepost/:postid', function(req,res){
    var posts = db.get('posts');
    posts.update({_id : req.params.postid},
      { $set : { button : 'Like' }},
      { $inc : { no_likes : -1 }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});

/*app.put('/unlikepost/:postid', function(req,res){
    var posts = db.get('posts');
    posts.update({_id : req.params.postid},
      { $inc : { no_likes : -1 }},
      function(err, user){
        if(err)
          throw err;
        else
          res.json(res);
      }
    );
});*/

app.get('/getPosts', function(req, res){
  var posts = db.get('posts');
  posts.find({}, function(err,posts){
    if(err)
      throw err;
    else{
      res.json(posts);
    }
  });
});

app.get('/places/:username', function(req,res){
  var users = db.get('users');
  users.find({}, function(err,places){
    if(err)
      throw err;
    else {
      res.json(places);
    }
  });
});

/*app.get('*', function(req,res){
  res.sendFile(__dirname + "/profile.html");
});*/

server.listen(3000);
var listener = io.listen(server);
listener.sockets.on('connection', function(socket){
  io.sockets.emit('connected', connected);
});
  //io.sockets.emit('connected');
console.log("listening at 3000 port");
