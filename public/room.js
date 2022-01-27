export default function createRoom() {

    const state = {
        show: false,
        players: {}
    }

    const observers = []

    function subscribe(func) {
        observers.push(func)
    }

    function notifyAll(vote) {
        for (const observer of observers) {
            observer(vote)
        }
    }

    function addPlayer(command) {
        const { playerId, name } = command;
        state.players[playerId] = {
            name,
            vote: null
        }
        notifyAll({
            type: 'add-player',
            data: {
                playerId,
                player: state.players[playerId]
            }
        })
    }

    function toggleShow() {
        state.show = !state.show;

        notifyAll({
            type: 'show',
            data: null
        })
    }

    function removePlayer(command) {
        const { playerId } = command
        delete state.players[playerId];
        notifyAll({
            type: 'remove-player',
            data: { playerId }
        })
    }

    function vote(vote) {
        const player = state.players[vote.playerId];

        if (player) player.vote = vote.value;

        notifyAll({
            type: 'vote',
            data: vote
        })
    }

    return {
        vote,
        state,
        addPlayer,
        removePlayer,
        toggleShow,
        subscribe,
        notifyAll
    }

}