// FRONTEND server
// ".connect" to create a connection
const socket = io.connect('http://localhost:4000');
// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
// Emit events
// listens for 'click' event
// cb will emit an event of carrying message
// down the socket to the server 
// first param is the 'chat', second is an object
// which is the message and the handle
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});
// listens for users typing (pressing keyboard keys)
// sends a message of "typing" across all sockets
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    // whatever is written, add the data handler to the message outputted
    // 'laurie says....'
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});