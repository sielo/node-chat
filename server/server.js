const path = require('path');  // wbudowany w node.js
//console.log(__dirname+'/../public');  

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
//console.log(publicPath);  

const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message.js');
const { isRealString } = require('./utils/validation.js');
const { Users } = require('./utils/users.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));  // wskazujemy z którego folderu pobierać pliki statyczne  np: http://localhost:3000/index.html

io.on('connection', (socket) => {
    console.log('New user connected:', socket);

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }
        socket.join(params.room);
        users.removeUser(socket.id);  // usuwamy usera z innych pokoi
        users.addUser(socket.id, params.name, params.room);
        // wysyłamy info do tego pokoju zeby odświezyła się lista na ekranie u wszystkich ludzi z tego pokoju
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave(room-name);  --> opuszcza pokój
        // wysyłamy powitanie temu userowi
        socket.emit('newMessage',
            generateMessage('Admin', `Welcome to chat...`));   // emituje zdarzenie TYLKO do tego usera
        // wysyłamy info do wszystkich userów z tego pokoju (POZA TYM DODAWANYM!) o nowym uczestniku
        socket.broadcast
            .to(params.room)
            .emit('newMessage', generateMessage('Admin', `${params.name} joined the chat...`)); // emituje zdarzenia do WSZYSTKICH podłączonych do pokoju ROOM POZA wywołującym

        // socket.emit('newMessage',
        //     generateMessage('Admin', `Welcome to chat...`));   // emituje zdarzenie TYLKO do tego usera
        // socket.broadcast.emit('newMessage',
        //     generateMessage('Admin', `User joined the chat...`)); // emituje zdarzenia do WSZYSTKICH podłączonych POZA wywołującym

        callback();

    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);


        // Poniszy kod emituje zdarzenie do wszystkich podłączonych
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('');   // to jest funkcja callback podana w socket.emit(<event>, <dane>, <callback>)
        // Poniszy kod emituje zdarzebie do wszystkich POZA tym który jest w "socket" (czyli tym który dołączył do chatu)
        // socket.broadcast.emit('newMessage', {    // emituje zdarzenia do WSZYSTKICH podłączonych
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    });
    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    });
    socket.on('disconnect', () => {
        //console.log('User disconnected!', socket)
        var user = users.removeUser(socket.id);  // usuwamy usera z innych pokoi
        // wysyłamy info do tego pokoju zeby odświezyła się lista na ekranie u wszystkich ludzi z tego pokoju
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room)
            .emit('newMessage', generateMessage('Admin', `${user.name} left the chat...`)); // emituje zdarzenia do WSZYSTKICH podłączonych do pokoju ROOM POZA wywołującym
       }
    });
});




app.get('/abc', (req, res) => {

});

server.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie: ${port}`);
});
module.exports.app = app;