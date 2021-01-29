// Підключення модулів необхідних для запуску сайта і бекенду
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io');
//Кінець
server.listen(3000);                      //Прописано який порт буде відслідковувати сервер

app.get('/',function (request,respons) {  //request = Запрос; respons =  ответ
    respons.sendFile(__dirname + '/index.html');          // Дозволяэ відправити деякий файл (__dirname = деректорыя в якій ми знаходимся)
});// Який URL-фдрес ми відслідковіємо
