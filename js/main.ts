document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("teams")!.addEventListener("change", function() {
        let value = (this as HTMLSelectElement).value;
        fetch("http://localhost:8112/players?teamId=611")
            .then(response => response.json())
            .then(data => {
                document.getElementById('result')!.innerHTML = data;
            });
    });
});
