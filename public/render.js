export default function render(screen, room, requestAnimationFrame) {
    screen.innerHTML = '';

    for (let playerId in room.state.players) {
        const player = room.state.players[playerId]
        const p = document.createElement('p');
        p.innerHTML = player.name + ' - Vote: ' + (player.vote ? (room.state.show ? player.vote : 'x') : '?');
        screen.appendChild(p);
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