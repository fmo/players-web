document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("teams").addEventListener("change", async function() {
        let selectedTeamId = this.value

        let response = await fetch("http://localhost:8112/players?teamId=" + selectedTeamId)
        let { data } = await response.json()

        let playersByPosition = groupPlayersByPosition(data)
        let orderedPlayers = orderPlayersByPosition(playersByPosition);

        displayPlayers(orderedPlayers)
    });
});

function groupPlayersByPosition(players) {
    let playersByPosition = {};

    players.forEach((player) => {
        if (!playersByPosition[player.position]) {
            playersByPosition[player.position] = []
        }
        playersByPosition[player.position].push(player)
    })

    return playersByPosition
}

function orderPlayersByPosition(playersByPosition) {
    const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
    let orderedPlayers = {};

    positionOrder.forEach(position => {
        if (playersByPosition[position]) {
            orderedPlayers[position] = playersByPosition[position];
        }
    });

    return orderedPlayers
}

function displayPlayers(orderedPlayers) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    Object.keys(orderedPlayers).forEach(position => {
        resultElement.innerHTML += `<h3>${position}</h3>`;

        orderedPlayers[position].forEach(player => {
            resultElement.innerHTML += `${player.firstname} ${player.lastname}<br />`;
        });
    });
}
