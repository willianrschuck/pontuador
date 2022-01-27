import app from './app.js'
import websocket from './server-socket.js'
import createRoom from './public/room.js'
import { v1 as uuidv1 } from 'uuid';

const room = createRoom();

const server = app.listen(3000, () => {
    console.log('App running!');
});

room.subscribe(event => {
    let sData = JSON.stringify({
        event: event.type,
        data: event.data
    });
    wss.clients.forEach(ws => {
        ws.send(sData)
    })
})

const wss = websocket(server);
wss.on('connection', (ws, req) => {

    ws.id = uuidv1();

    ws.send(JSON.stringify({
        event: 'setup',
        data: {
            state: room.state,
            playerId: ws.id
        }
    }));

    room.addPlayer({ playerId: ws.id, name: ws.id })

    ws.on('close', () => {
        room.removePlayer({ playerId: ws.id });
    })

    ws.on('message', msg => {
        let { event, data } = JSON.parse(msg);

        if (event == 'vote') {
            room.vote(data);
        } else if (event == 'show') {
            room.toggleShow();
        }

    })

});


