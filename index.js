var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/images'));

const path = require('path');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

var server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
app.use(express.static("./views"));

var io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
    var path = __dirname + '/game.html';
    console.log(path);
    res.sendFile(path);
});

app.post("/start_game", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    res.sendFile(__dirname + '/views/start_game.html');
});
var players = []
io.on('connection', function(socket) {
    players.push(socket);
    console.log("Connected");
    io.emit('players_in_room',players.length);

    socket.on('disconnect', function () {
    players.splice(players.indexOf(socket),1);
    console.log("disconnected");
    io.emit('players_in_room',players.length);
    });
});
