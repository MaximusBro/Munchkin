var express = require('express');
var app = express();
//
app.use(express.urlencoded());
app.use(express.json());
//
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/images'));

const path = require('path');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

var server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
app.use('/public', express.static('public'));

var io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/game.html');
});

app.post("/munchkin", urlencodedParser, function (req, res) {
  if (players.length == 0) {
    if(!req.body) return res.sendStatus(400);
    res.sendFile(__dirname + '/munchkin.html');
  }
    else {
      console.log("Комната занята");
    }
});
app.post("/munchkin_start", urlencodedParser, function (req, res) {
  if (req.body.pris == password) {
    if(!req.body) return res.sendStatus(400);
    res.sendFile(__dirname + '/munchkin.html');
  }
    else {
      console.log("Комната не создана");
    }
});
app.post("/munchkin_set_password", urlencodedParser, function (req, res) {
    password = req.body.pass;
    res.sendFile(__dirname + '/munchkin.html');
});
var players = []
var password = ""
io.on('connection', function(socket) {
    players.push(socket);
    console.log("Connected");
    //
    io.emit('players_in_room',players.length);
    // io.emit('players_in_room',players.length)
    socket.on('disconnect', function () {
    players.splice(players.indexOf(socket),1);
    console.log("disconnected");
    io.emit('players_in_room',players.length);

    // socket.on('open_room',function (pass) {
    //   password = pass;
    // })
    // socket.on('send_name',function (name) {
    //   io.emit('set_name',name);
    // })
    });
});
