var socket = io();  // tworzy połączenie


function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child') // właśnie dodana ostatnia wiadomość
    var clientHeight = messages.prop('clientHeight');  // wysokość ekranu z wiadomościami widocznego
    var scrollTop = messages.prop('scrollTop');        // przesunięcie od góry całego pola do górnej krawędzi widocznego okna (client)
    var scrollHeight = messages.prop('scrollHeight');  // długość całego scrolla 
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    // Jeśli jesteśmy na dole scrolla to "clientHeight + scrollTop = scrollHeight"
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('should scroll!');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    console.log('Connected to server!');
    var params = deparam(window.location.search);  // w js/libs/deparam.js
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error!');
        }
    });
    // socket.emit('createMessage', {
    //     from: 'Michał',
    //     text: 'Treść!'
    // });
});
socket.on('disconnect', () => {
    console.log('Disconnected from server!')
});
socket.on('updateUserList', (users) => {
    //console.log('users list:', users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});
socket.on('newMessage', (message) => {

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('hh:mm.ss')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hey maaaan!'
// }, function (info) {
//     console.log(`Serwer odpowiedział:::: Przyjąłem z komentarzem:`, info);
// });
socket.on('newLocationMessage', function (message) {

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: moment(message.createdAt).format('hh:mm.ss')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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