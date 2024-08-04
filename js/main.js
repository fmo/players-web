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
    const positionOrder = ["Goalkeeper", "Left-Back", "Right-Back", "Centre-Back", "Defensive Midfield", "Central Midfield", "Left Winger", "Right Winger", "Attacking Midfield", "Centre-Forward"];
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
        orderedPlayers[position].forEach(player => {
            let formattedMarketValue = replaceZerosWithLetter(player.marketValue);

            resultElement.innerHTML += `<div class="players">
                <div class="shirt-number">${player.shirtNumber}</div>
                <div class="player-photo"></div>
                <div class="player-name-position">
                    <div class="player-name">${player.name}</div>
                    <div class="player-position">${position}</div>
                </div>
                <div class="player-value">${player.marketValueCurrency}${formattedMarketValue}</div>
            </div>`;
        });
    });
}

// replaces 6 zeros with M and 5 zeros with K
function replaceZerosWithLetter(marketValue) {
    let marketValueString = marketValue.toString();
    let marketValueLength = marketValueString.length;

    if (marketValueLength > 6) {
        return marketValueString.slice(0, marketValueLength - 6) + 'M';
    } else if (marketValueLength > 3) {
        return marketValueString.slice(0, marketValueLength - 3) + 'K';
    } else {
        return marketValueString;
    }
}
