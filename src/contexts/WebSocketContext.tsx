import React, { createContext, useContext, useMemo } from 'react';
import { SharedWorkerClient } from '../shared-worker-client';

const WebSocketContext = createContext<SharedWorkerClient | null>(null);
export const useWebSocket = () => useContext(WebSocketContext)!;

interface WebSocketProviderProps {
    children: React.ReactNode;
    onMessage: (msg: string) => void;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children, onMessage }) => {
    const client = useMemo(() => new SharedWorkerClient(onMessage), [onMessage]);

    return <WebSocketContext.Provider value={client}>{children}</WebSocketContext.Provider>;
};
