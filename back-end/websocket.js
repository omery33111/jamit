document.addEventListener("DOMContentLoaded", function() {
    const socketInstance = new WebSocket(`${process.env.BACKEND_URL}/ws/chat/`);

    // Connection opened
    socketInstance.addEventListener('open', function (event) {
        console.log('Connected to the WebSocket server');
    });

    // Listen for messages
    socketInstance.addEventListener('message', function (event) {
        console.log('Message from server: ', event.data);
    });

    // Connection closed
    socketInstance.addEventListener('close', function (event) {
        console.log('Disconnected from the WebSocket server');
    });

    // Handle errors
    socketInstance.addEventListener('error', function (event) {
        console.error('WebSocket error: ', event);
    });

    // Send a message to the server
    document.getElementById('sendButton').addEventListener('click', function() {
        const message = document.getElementById('messageInput').value;
        socketInstance.send(message);
        console.log('Message sent: ', message);
    });
});
