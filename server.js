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
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('login', (user) => {
    const userObject = {user: user, id: socket.id};
    users.push(userObject);
    console.log(users);
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left') 
    for(let activeUser of users){
      if(activeUser.id == socket.id){
        console.log('activeUser: ', activeUser, ' activeUserID: ', activeUser.id, socket.id)
        const index = users.indexOf(activeUser);
        users.splice(index);
      }
    }
    console.log(users);
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});