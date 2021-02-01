const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});
// app.get("/start_game", urlencodedParser, function (request, response) {
//     response.sendFile(__dirname + "/start_game.html");
// });
a = 0;
app.post("/start_game", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.sendFile(__dirname + "/start_game.html")
    console.log("You connect");
});
//
const server = require('http').Server(app); //
app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
//

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});
app.get('/game', function(req, res) {
    res.sendFile(path.join(__dirname + '/game.html'));
});
