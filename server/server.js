const path = require('path');  // wbudowany w node.js
//console.log(__dirname+'/../public');  

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
//console.log(publicPath);  

const express = require('express');
const http = require('http')
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));  // wskazujemy z którego folderu pobierać pliki statyczne  np: http://localhost:3000/index.html

io.on('connection', (socket) => {
    console.log('New user connected:', socket);

    // socket.emit('newMessage', {   // emituje zdarzenie tylko do tego socketa
    //     from: 'Michał',
    //     text: 'Cześć Zdzichu!',
    //     createAt: new Date()
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });  // emituje zdarzenia do WSZYSTKICH podłączonych
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