$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); //prevent page reload
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return true;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
});