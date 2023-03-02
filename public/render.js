const faces = ['😁', '😃', '🤓', '😎', '😊', '😬', '😌'];

export default function render(screen, room, requestAnimationFrame) {
    screen.innerHTML = '';

    for (let playerId in room.state.players) {

        const player = room.state.players[playerId]
        const div = document.createElement('div');

        if (player.spectator === true) {

            div.innerHTML = '👀';
            div.className = 'border col-2 p-3 m-2 rounded-pill border-0 bg-secondary bg-opacity-25 fs-1';

        } else {

            const userIdLastChar = playerId.charCodeAt(2);
            const userFace = faces[userIdLastChar % faces.length];
            const voto = room.state.show ? (player.vote || '😳') : (player.vote ? userFace + '👍' : '🤔');
            div.innerHTML = voto;
            div.className = `border border-0 ${player.vote ? 'bg-success ' : 'bg-warning-subtle '}col-2 p-3 m-2 rounded-pill bg-opacity-25 fs-1`;

        }

        screen.appendChild(div);
    }

    

    requestAnimationFrame(() => {
        render(screen, room, requestAnimationFrame);
    })
}

export function renderButtons() {

}