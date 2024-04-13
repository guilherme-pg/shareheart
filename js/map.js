var map = L.map("map").setView([-8.047562, -34.877002], 13); // Coordenadas de Recife

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { // Adiona o mapa à aplicação
  maxZoom: 19,
}).addTo(map);

// Marcador para a localização do usuário
navigator.geolocation.getCurrentPosition(function (position) {
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;
  L.marker([userLat, userLng])
    .addTo(map)
    .bindPopup("Minha localização atual!")
    .openPopup();
});

// Marcadores para instituições em Recife
var points = [
  { name: "Academia para o Desenvolvimento da Educação Brasil", latlng: [-8.061941635948179, -34.872561149372544] },
  { name: "Associação Arte e Vida", latlng: [-8.064922397004764, -34.87334425894304] },
  { name: "Associação Beneficente Filhas de Santana", latlng: [-8.034312747181934, -34.901202577910254] },
  { name: "Círculo do Coração de Pernambuco", latlng: [-8.033883129323511, -34.87820813558206] },
  { name: "Associação Da 3ª Idade Da Vila São Miguel", latlng: [-8.0798366645665, -34.91062370859743] },
  { name: "Associaçãode de Parkinson de Pernambuco", latlng: [-8.046472077868632, -34.926947093253844] },
  { name: "Anjos do Poço", latlng: [-8.037620389827598, -34.92303615092564] },
  { name: "Associação Casa do Amor", latlng: [-8.02503501277099, -34.89549249325384] },
  { name: "Associação Projeto Casa Da Criança", latlng: [-8.122240207594238, -34.901075522089734] },
  { name: "Instituição Filhas de Maria Servas da Caridade", latlng: [-8.063648424526296, -34.890396606746144] },
  { name: "Lar do Nenen", latlng: [-8.050538172653864, -34.91078795092563] },
  { name: "NACC - Núcleo de Apoio à Criança com Câncer", latlng: [-8.038083490039801, -34.902505637433336] },
  { name: "Instituição de Caridade Lar Paulo de Tarso", latlng: [-8.109090222719505, -34.92381166441795] },
  { name: "Grupo de Ajuda à Criança Carente com Câncer de Pernambuco (GAC-PE)", latlng: [-8.0464812474827, -34.886646922089746] },
  { name: "AACD - Associação de Assistência à Criança Deficiente", latlng: [-8.071789450961326, -34.893094589846704] },
];

points.forEach(function (point) {
  L.marker(point.latlng).addTo(map).bindPopup(point.name);
});

// Atualiza o tamanho do mapa quando a janela for redimensionada
window.addEventListener("resize", function () {
  map.invalidateSize();
});
