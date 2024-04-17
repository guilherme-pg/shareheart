
window.onload = function() {

    // Coordenadas de Recife
    var map = L.map("map").setView([-8.047562, -34.877002], 13); 


    // solicitar PERMISSÃO para acessar a localização do usuário
    map.locate({ setView: true, maxZoom: 16});


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap'
    }).addTo(map)


    // marcador para a LOCALIZAÇÃO DO USUÁRIO
    function onLocationFound(e) {
        // var radius = e.accuracy / 2;

        L.marker(e.latlng, {
            icon: greenIcon
        }).addTo(map)
            .bindPopup("You are here.").openPopup();
    }


    map.on('locationfound', onLocationFound);


    // USER pin RED
    var greenIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    // carregar pontos de interesse de JSON
    fetch('../institutions.json')
        .then(response => response.json())
        .then(data => {
            data.institutions.forEach(function (point) {
                L.marker([point.latitude, point.longitude]).addTo(map)
                    .bindPopup(point.name);
            });
        })
        .catch(error => console.error('Erro ao caregar os pontos de interesse: ', error));
}


