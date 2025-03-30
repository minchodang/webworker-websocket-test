export type MessageHandler = (msg: string) => void;

export class SharedWorkerClient {
    private worker: SharedWorker;
    private port: MessagePort;

    constructor(onMessage: MessageHandler) {
        this.worker = new SharedWorker('/shared-worker.js');
        this.port = this.worker.port;

        this.port.onmessage = (e: MessageEvent) => {
            if (e.data.type === 'message') {
                onMessage(e.data.payload);
            }
        };

        this.port.start();
    }

    send(message: string) {
        this.port.postMessage({ type: 'send', payload: message });
    }
}
