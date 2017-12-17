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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hey maaaan!'
// }, function (info) {
//     console.log(`Serwer odpowiedział:::: Przyjąłem z komentarzem:`, info);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (info) {

        console.log(`Serwer odpowiedział:::: Przyjąłem z komentarzem:`, info);
    });
});
