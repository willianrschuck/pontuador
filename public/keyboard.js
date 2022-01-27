export default function createVoteListener() {

    const state = {
        playerId: null,
        observers: []
    }

    function setPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(func) {
        state.observers.push(func);
    }

    function notifyAll(vote) {
        for (const observer of state.observers) {
            observer(vote)
        }
    }

    document.addEventListener('vote', handlePlayerVote, false)

    function handlePlayerVote(vote) {
        const value = vote.target.value;
        const playerId = state.playerId;

        notifyAll({ playerId, value });
    }

    return {
        setPlayerId,
        subscribe,
        handlePlayerVote
    }

}