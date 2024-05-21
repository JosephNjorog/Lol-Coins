const socket = io();

document.getElementById('send-button').addEventListener('click', () => {
  const message = document.getElementById('chat-input').value;
  socket.emit('chat message', message);
  document.getElementById('chat-input').value = '';
});

socket.on('chat message', (msg) => {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
});
