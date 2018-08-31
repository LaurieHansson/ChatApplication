const express = require('express');
const socket = require('socket.io');
// App setup
const app = express();
const server = app.listen(4000, function(){
    console.log('Loud and clear');
});
// Static files
app.use(express.static('public'));
// Socket setup & pass server
// socket is used as a function. Socket takes a server as it's
// parameter. This generates a server that waits around until 
// somebody enters the socket and creates a connection.
const io = socket(server);
io.on('connection', (socket) => {
console.log('User has made a connection', socket.id);
// One user hitting one socket will have their own instance of 
// a socket.

    // Handle chat event
    socket.on('chat', function(data){
        // data == message data created by user input
        console.log(data);
        // send out message to ALL sockets connected to 
        // server
        io.sockets.emit('chat', data);
    });
    // Handle typing event
    // data == message data created by user input
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});


