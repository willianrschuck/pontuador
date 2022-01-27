import WebSocket, { WebSocketServer } from 'ws'
 
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    
}
 

 
export default (server) => {
    const wss = new WebSocketServer({server});
    console.log(`App Web Socket Server is running!`);
    return wss;
}