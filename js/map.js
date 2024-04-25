// Seção para a área de mapa da aplicação

var map = L.map("map").setView([-8.047562, -34.877002], 13); // Coordenadas de Recife

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  // Adiona o mapa à aplicação
  maxZoom: 19,
}).addTo(map);

// USER pin RED
var redIcon = L.icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Marcador para a localização do usuário
navigator.geolocation.getCurrentPosition(function (position) {
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;
  L.marker([userLat, userLng], {icon: redIcon})
    .addTo(map)
    .bindPopup("Minha localização atual!")
    .openPopup();
});

// Marcadores para instituições em Recife
var points = [
  {
    name: "Academia para o Desenvolvimento da Educação Brasil",
    latlng: [-8.061941635948179, -34.872561149372544],
  },
  {
    name: "Associação Arte e Vida",
    latlng: [-8.064922397004764, -34.87334425894304],
  },
  {
    name: "Associação Beneficente Filhas de Santana",
    latlng: [-8.034312747181934, -34.901202577910254],
  },
  {
    name: "Círculo do Coração de Pernambuco",
    latlng: [-8.033883129323511, -34.87820813558206],
  },
  {
    name: "Associação Da 3ª Idade Da Vila São Miguel",
    latlng: [-8.0798366645665, -34.91062370859743],
  },
  {
    name: "Associaçãode de Parkinson de Pernambuco",
    latlng: [-8.046472077868632, -34.926947093253844],
  },
  { name: "Anjos do Poço", latlng: [-8.037620389827598, -34.92303615092564] },
  {
    name: "Associação Casa do Amor",
    latlng: [-8.02503501277099, -34.89549249325384],
  },
  {
    name: "Associação Projeto Casa Da Criança",
    latlng: [-8.122240207594238, -34.901075522089734],
  },
  {
    name: "Instituição Filhas de Maria Servas da Caridade",
    latlng: [-8.063648424526296, -34.890396606746144],
  },
  { name: "Lar do Nenen", latlng: [-8.050538172653864, -34.91078795092563] },
  {
    name: "NACC - Núcleo de Apoio à Criança com Câncer",
    latlng: [-8.038083490039801, -34.902505637433336],
  },
  {
    name: "Instituição de Caridade Lar Paulo de Tarso",
    latlng: [-8.109090222719505, -34.92381166441795],
  },
  {
    name: "Grupo de Ajuda à Criança Carente com Câncer de Pernambuco (GAC-PE)",
    latlng: [-8.0464812474827, -34.886646922089746],
  },
  {
    name: "AACD - Associação de Assistência à Criança Deficiente",
    latlng: [-8.071789450961326, -34.893094589846704],
  },
  {
    name: "Instituto Beneficente Amigos da Criança",
    latlng: [-8.086454, -34.945078],
  },
  {
    name: "Instituto de Assistência Social e Cidadania",
    latlng: [-8.009658, -34.853392],
  },
  {
    name: "Associação de Assistência à Criança e ao Adolescente",
    latlng: [-8.102923, -34.908072],
  },
  {
    name: "Associação de Apoio aos Doentes com Câncer",
    latlng: [-8.009833, -34.859836],
  },
  {
    name: "Associação Beneficente de Apoio aos Idosos",
    latlng: [-8.130174, -34.928743],
  },
  {
    name: "Centro de Acolhimento e Apoio à Mulher",
    latlng: [-8.006401, -34.855799],
  },
  {
    name: "Centro de Educação e Desenvolvimento Comunitário",
    latlng: [-7.998456, -34.847309],
  },
  {
    name: "Instituto de Acolhimento e Resgate da Cidadania",
    latlng: [-8.132407, -34.935422],
  },
  {
    name: "Centro de Promoção da Saúde",
    latlng: [-7.998898, -34.854144],
  },
  {
    name: "Associação de Amparo aos Animais",
    latlng: [-8.108246, -34.912726],
  },
  {
    name: "Associação de Apoio aos Portadores de Deficiência",
    latlng: [-7.996789, -34.852162],
  },
  {
    name: "Instituto de Ação Social e Desenvolvimento",
    latlng: [-8.123395, -34.935668],
  },
  {
    name: "Associação de Assistência ao Dependente Químico",
    latlng: [-8.006774, -34.854784],
  },
  {
    name: "Centro de Integração e Apoio ao Trabalhador",
    latlng: [-8.134799, -34.931726],
  },
  {
    name: "Associação de Apoio à Terceira Idade",
    latlng: [-7.996539, -34.851982],
  },
];

points.forEach(function (point) {
  L.marker(point.latlng).addTo(map).bindPopup(point.name);
});

// Atualiza o tamanho do mapa quando a janela for redimensionada
window.addEventListener("resize", function () {
  map.invalidateSize();
});

// Seção para calcular as Instituições mais próximas ao usuário
document.addEventListener("DOMContentLoaded", () => {
  const getLocationButton = document.getElementById("getLocation");
  const userLocationSpan = document.getElementById("userLocation");
  const institutionDiv = document.getElementById("institution");

  getLocationButton.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        userLocationSpan.textContent = `${userLat.toFixed(
          6
        )}, ${userLng.toFixed(6)}`;

        // Carrega dados JSON com as instituições
        const response = await fetch("institutions.json");
        const data = await response.json();

        // Calcula a distância entre o doador e cada instituição
        const distances = data.institutions.map((institution) => {
          const distance = calculateDistance(
            userLat,
            userLng,
            institution.latitude,
            institution.longitude
          );
          return {
            institution,
            distance,
          };
        });

        // Classifica as instituições por distância
        distances.sort((a, b) => a.distance - b.distance);

        // Exibe as instituições mais próximas
        institutionDiv.innerHTML = distances.slice(0, 7)
          .map((item) => {
            const arrivalTime = calculateArrivalTime(item.distance);
            return `
                      <h2>${item.institution.name}</h2>
                      <p><strong>Endereço:</strong> ${
                        item.institution.address
                      }</p>
                      <p><strong>Distância:</strong> ${item.distance.toFixed(
                        2
                      )} km</p>
                      <p><strong>Tempo de Chegada:</strong> ${arrivalTime.toFixed(
                        0
                      )} minutos</p>
                      <p class="telefone"><strong>Telefone:</strong> <a href="tel:+${
                        item.institution.phone
                      }">${item.institution.phone}</a></p><br>
                  `;
          })
          .join("");
      });
    } else {
      alert("Geolocalização não está disponível no seu navegador.");
    }
  });

  // Funções para calcular distância e tempo de chegada
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function calculateArrivalTime(distance) {
    const averageSpeed = 40; 
    const time = (distance / averageSpeed) * 60; // Tempo em minutos
    return time;
  }
});
