export default function render(screen, room, requestAnimationFrame) {
    screen.innerHTML = '';

    for (let playerId in room.state.players) {
        const player = room.state.players[playerId]
        const p = document.createElement('div');
        // const voto = (player.vote ? (room.state.show ? player.vote : '👍🏻') : '🤔');
        const voto = room.state.show ? (player.vote || '😳') : (player.vote ? '👍🏻' : '🤔');
        p.innerHTML = voto
        p.className = 'border col-2 p-3 m-2 rounded-pill border-info bg-info bg-opacity-10 fs-1'
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