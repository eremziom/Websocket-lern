const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const socket = io();

//listener
socket.on('message', (event) => addMessage(event.author, event.content));
socket.on('join', (user) => addMessage('Server', `<i><b>${user}</b> has just logged in</i>`));
socket.on('leave', (user) => addMessage('Server', `<i><b>${user}</b> has just left</i>`))

login = (event) => {
  event.preventDefault();
  if(!userNameInput.value){
    alert('enter username');
  }
  else{
    userName = userNameInput.value;
    socket.emit('login',  userName )
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received')
  if(author == userName){
    message.classList.add('message--self');
  }
  message.innerHTML = 
  `<h3 class='message__author'>${userName === author ? 'You' : author}</h3>
  <div class='message__content'>${content}</div>`;
  messagesList.appendChild(message);
}

sendMessage = (event) => {
  event.preventDefault();
  if(!messageContentInput.value){
    alert('write message before sending');
  }
  else {
    addMessage(userName, messageContentInput.value)
    socket.emit('message', { author: userName, content: messageContentInput.value })
    messageContentInput.value = '';
  }
}

loginForm.addEventListener('submit', function(event){
  login(event);
});

addMessageForm.addEventListener('submit', function(event){
  sendMessage(event);
})