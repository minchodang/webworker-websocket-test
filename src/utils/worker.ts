/// <reference lib="webworker" />
import { io } from 'socket.io-client';

const socket = io('wss://echo.websocket.events');
const ports: MessagePort[] = [];

self.onconnect = (e: MessageEvent) => {
    const port = e.ports[0];
    ports.push(port);
    port.onmessage = messageEvent => {
        const { msg } = messageEvent.data;
        socket.emit('send_normal_chat', {
            msg,
        });
    };
    socket.on('message', (msg: string) => {
        ports.forEach(p => p.postMessage({ msg }));
    });
};
