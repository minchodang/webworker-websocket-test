const connections = [];
let socket = null;

function setupWebSocket() {
    socket = new WebSocket('wss://echo.websocket.events');

    socket.onmessage = event => {
        connections.forEach(port => {
            port.postMessage({ type: 'message', payload: event.data });
        });
    };

    socket.onclose = () => {
        setTimeout(setupWebSocket, 3000); // 재연결
    };
}

setupWebSocket();

onconnect = event => {
    const port = event.ports[0];
    connections.push(port);

    port.onmessage = ({ data }) => {
        if (data.type === 'send' && socket?.readyState === WebSocket.OPEN) {
            socket.send(data.payload);
        }
    };

    port.start();
};
