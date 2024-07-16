document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("teams").addEventListener("change", async function() {
        let response = await fetch("http://localhost:8112/players?teamId=611")
        let { data } = await response.json()

        data.forEach((player) => {
            document.getElementById('result').innerHTML += player.firstname + " " + player.lastname + "<br />";
        });
    });
});
