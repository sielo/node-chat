var socket = io();  // tworzy połączenie
socket.on('connect', () => {
    console.log('Connected to server!');


    // socket.emit('createMessage', {
    //     from: 'Michał',
    //     text: 'Treść!'
    // });
});
socket.on('disconnect', () => {
    console.log('Disconnected from server!')
});
socket.on('newMessage', (message) => {
    console.log('Got new Message:::', message);
});
