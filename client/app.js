const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

login = (event) => {
  event.preventDefault();
  console.log('klik');
  if(!userNameInput.value){
    alert('enter username');
  }
  else{
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
  console.log('username: ', userName);
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
    messageContentInput.value = '';
  }
}

loginForm.addEventListener('submit', function(event){
  login(event);
});

addMessageForm.addEventListener('submit', function(event){
  sendMessage(event);
})