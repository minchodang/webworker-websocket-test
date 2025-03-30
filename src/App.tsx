import React, { useState } from 'react';
import { WebSocketProvider } from './contexts/WebSocketContext';

function App() {
    const [messages, setMessages] = useState<string[]>([]);

    console.log(messages);

    return (
        <WebSocketProvider onMessage={msg => setMessages(prev => [...prev, msg])}>
            <div>sss</div>
        </WebSocketProvider>
    );
}

export default App;
