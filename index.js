const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

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
