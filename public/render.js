const faces = ['😁', '😃', '🤓', '😎', '😊', '😬', '😌'];

export default function render(screen, room, requestAnimationFrame) {
    screen.innerHTML = '';

    for (let playerId in room.state.players) {
        
        const player = room.state.players[playerId]
        const div = document.createElement('div');
        
        if (player.spectator === true) {
            
            div.innerHTML = '👀';
            div.className = 'border col-2 p-3 m-2 rounded-pill border-secondary bg-secondary bg-opacity-10 fs-1';
            
        } else {
            
            const userIdLastChar = playerId.charCodeAt(2);
            const userFace = faces[userIdLastChar % faces.length];
            const voto = room.state.show ? (player.vote || '😳') : (player.vote ? userFace+'👍🏻' : '🤔');
            div.innerHTML = voto;
            div.className = 'border col-2 p-3 m-2 rounded-pill border-primary bg-primary bg-opacity-10 fs-1';
            
        }
        
        screen.appendChild(div);
    }

    requestAnimationFrame(() => {
        render(screen, room, requestAnimationFrame);
    })
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}