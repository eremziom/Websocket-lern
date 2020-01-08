const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen( 8000, () => {
  console.log('server is running on Port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('login', (user) => {
    const userObject = {user: user, id: socket.id};
    users.push(userObject);
    socket.broadcast.emit('join', user);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, client ' + socket.id + ' has left') 
    for(let activeUser of users){
      if(activeUser.id == socket.id){
        const index = users.indexOf(activeUser);
        users.splice(index);
        socket.broadcast.emit('leave', activeUser.user);
      }
    }
  });
});