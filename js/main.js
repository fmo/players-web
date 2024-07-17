document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("teams").addEventListener("change", async function() {
        let selectedTeamId = this.value

        let response = await fetch("http://localhost:8112/players?teamId=" + selectedTeamId)
        let { data } = await response.json()

        data.forEach((player) => {
            document.getElementById('result').innerHTML += player.firstname + " " + player.lastname + "<br />";
        });
    });
});
