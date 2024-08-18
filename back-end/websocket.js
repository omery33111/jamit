document.addEventListener("DOMContentLoaded", function() {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/');

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to the WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server: ', event.data);
    });

    // Connection closed
    socket.addEventListener('close', function (event) {
        console.log('Disconnected from the WebSocket server');
    });

    // Handle errors
    socket.addEventListener('error', function (event) {
        console.error('WebSocket error: ', event);
    });

    // Send a message to the server
    document.getElementById('sendButton').addEventListener('click', function() {
        const message = document.getElementById('messageInput').value;
        socket.send(message);
        console.log('Message sent: ', message);
    });
});