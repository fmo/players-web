document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("teams").addEventListener("change", function () {
        var value = this.value;
        fetch("http://localhost:8112/players?teamId=611")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            document.getElementById('result').innerHTML = data;
        });
    });
});
