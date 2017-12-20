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
socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (info) {
        messageTextBox.val('');
        console.log(`Serwer odpowiedział:::: Przyjąłem z komentarzem:`, info);
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Brak geolokacji w przeglądarce!')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (info) {

            console.log(`Serwer przyjął moją pozycję`, info);
        });
    }, function (err) {
        alert('Unable to share location!' + err);
        locationButton.removeAttr('disabled').text('Send location');
    });
});