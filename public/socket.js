export default function createSocket(url) {

    const ws = new WebSocket(url)
    const eventCallbacks = {}

    function on(event, callback) {
        eventCallbacks[event] = eventCallbacks[event] || [];
        eventCallbacks[event].push(callback);
    }

    function send(event, data) {
        let jsonData = JSON.stringify({event, data});
        ws.send(jsonData)
    }

    ws.onmessage = msg => {

        console.log(msg)

        let json = JSON.parse(msg.data);
        let callbacks = eventCallbacks[json.event]
        if (callbacks) {
            for (let callback of callbacks) {
                callback(json.data);
            }
        }
    }

    return { on, send, ws }

}