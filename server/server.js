const path = require('path');  // wbudowany w node.js
//console.log(__dirname+'/../public');  

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
//console.log(publicPath);  

const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));  // wskazujemy z którego folderu pobierać pliki statyczne  np: http://localhost:3000/index.html

io.on('connection', (socket) => {
    console.log('New user connected:', socket);

    socket.emit('newMessage',
        generateMessage('Admin', `Welcome to chat...`));   // emituje zdarzenie TYLKO do tego usera
    socket.broadcast.emit('newMessage',
        generateMessage('Admin', `User joined the chat...`)); // emituje zdarzenia do WSZYSTKICH podłączonych POZA wywołującym

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);


        // Poniszy kod emituje zdarzenie do wszystkich podłączonych
        io.emit('newMessage', generateMessage( message.from, message.text));

        // Poniszy kod emituje zdarzebie do wszystkich POZA tym który jest w "socket" (czyli tym który dołączył do chatu)
        // socket.broadcast.emit('newMessage', {    // emituje zdarzenia do WSZYSTKICH podłączonych
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected!', socket)
    });
});




app.get('/abc', (req, res) => {

});

server.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie: ${port}`);
});
module.exports.app = app;