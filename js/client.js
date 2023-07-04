const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".chat-messages");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    const messageContent = document.createElement('div');
    messageContent.innerText = message;
    messageContent.classList.add('content');

    messageElement.appendChild(messageContent);
    
    messageContainer.append(messageElement)
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const namee = prompt("Enter your name to join");

socket.emit('new-user-joined', namee);

socket.on('user-joined', namee =>{
    append(`${namee} joined the chat`, 'right');
});

socket.on('receive', data =>{
    append(`${data.name }: ${data.message}`, 'left'); 
});

socket.on('userDisconnected', (name) => {
    append(`${name} is disconnected from the chat.`, 'left');
});
