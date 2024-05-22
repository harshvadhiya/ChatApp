const messageInput = document.getElementById('message-input');
const chatArea = document.getElementById('chat-area');
const sendButton = document.getElementById('send-button');
let messageHistory = [];

const socket = io({ autoConnect: false });
window.onload = function () {
  document.getElementById('username').focus();

}

// Pop - Up Code
document.getElementById('usrSubmit').addEventListener('click', function (e) {
  e.preventDefault();
  let username = document.getElementById('username').value;
  if (username) {
    document.getElementById('card').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'flex';

    socket.connect();

    socket.on("connect", function () {
      socket.emit("user_join", username);
    });

  }
});

// focus on message input when user clicks on send button
document.getElementById('usrSubmit').addEventListener("click", ()=>{
  document.getElementById('message-input').focus();
});

// ___________________________________________________________CONNECTION STATUS____________________________________________________________




// Update Users Count
// document.getElementById('update-users-count').addEventListener('click', function (e) {
//   e.preventDefault();
//   socket.emit('update_users_count');
//   socket.on('connected_users', function (count) {
//     document.getElementById('users-count').innerHTML = count;
//   })
// });



socket.on('chat', function (data) {
  const username = document.createElement('div');
  username.className = 'usernameIncoming';
  username.innerHTML = `${data['username']}`;

  const chatMessage = document.createElement('div');
  chatMessage.className = 'chat-message incoming';
  chatMessage.innerHTML = data['message'];

  chatArea.appendChild(username);
  chatArea.appendChild(chatMessage);
  chatArea.scrollTop = chatArea.scrollHeight;
});

sendButton.addEventListener('click', function (event) {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (message) {
    if (message === ".clear") {
      chatArea.innerHTML = "";
      messageHistory = [];
    } else {
      messageHistory.push(message);

      const outgoingMessage = document.createElement('div');
      outgoingMessage.className = 'chat-message outgoing';
      outgoingMessage.textContent = message;
      chatArea.appendChild(outgoingMessage);

      socket.emit("message", message);
    }

    messageInput.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;
  }
});


const approxWidth = messageLength * 10 + 40; // Adjust multiplier and padding as needed
messageInput.style.width = Math.max(approxWidth + 'px', '50px'); // Ensure minimum width