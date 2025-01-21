const socket = io('http://localhost:3000');

const messageBox = document.querySelector('.message-box');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
let messageCount = 0; 

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach((msg, index) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = msg;
        messageElement.classList.add('user-message');
        if (index % 2 !== 0) {
            messageElement.classList.add('right'); 
        }
        messageBox.appendChild(messageElement);
    });
    messageBox.scrollTop = messageBox.scrollHeight;
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        saveMessage(message);
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

socket.on('chat message', (msg) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = msg;
    messageElement.classList.add('user-message');
    if (messageCount % 2 !== 0) {
        messageElement.classList.add('right'); 
    }
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
    messageCount++; 
});

loadMessages();
