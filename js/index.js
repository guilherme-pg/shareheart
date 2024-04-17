// add DATA from the FORM to the JSON file
document.addEventListener("DOMContentLoaded", function() {
    load_places();
})

function load_places() {
    fetch("../campaigns.json")
        .then(response => response.json())
        .then(data => {
            const list_places = document.getElementById("list_campaign")
            list_places.innerHTML = ""; // limpa a lista

            data.campaigns.forEach(item => {
                const li = document.createElement("li");
                const geolink = `<a href="geo:${item.latitude}, ${item.longitude}">Check in the Map</a>`;
                li.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Endereço: ${item.address}</p>
                    <p>Telefone: ${item.phone}</p>
                    `;
                list_places.appendChild(li);
            })
        })
        .catch(error => console.error("Erro ao carregar lista: ", error));

    fetch("../institutions.json")
        .then(response => response.json())
        .then(data => {
            const list_places = document.getElementById("list_institutions")
            list_places.innerHTML = ""; // limpa a lista

            data.institutions.forEach(item => {
                const li = document.createElement("li");
                const geolink = `<a href="geo:${item.latitude}, ${item.longitude}">Check in the Map</a>`;
                li.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Endereço: ${item.address}</p>
                    <p>Telefone: ${item.phone}</p>
                    `;
                list_places.appendChild(li);
            })
        })
        .catch(error => console.error("Erro ao carregar lista: ", error));
}