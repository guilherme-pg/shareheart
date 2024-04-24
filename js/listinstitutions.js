const btn_busca = document.querySelector('#btn_pesquisar');
const areaImprimirJson = document.querySelector('.list_content');

btn_busca.addEventListener("click", function() {
    var inputUsuario = document.querySelector('#campoBusca');
    var textoUsuario = inputUsuario.value.toLowerCase(); // Convertendo para minúsculas para comparação
    console.log("texto capturado:", textoUsuario);

    load_places(textoUsuario); // Chamar a função load_places com o texto do usuário como argumento
});

function load_places(textoFiltro = "") { // Adicionando um parâmetro para o texto de filtro
    fetch("../institutions.json")
        .then(response => response.json())
        .then(data => {
            const list_places = document.getElementById("list_places");
            list_places.innerHTML = ""; // Limpa a lista

            data.institutions.forEach(item => {
                // Verifica se o nome da instituição contém o texto de filtro
                if (item.name.toLowerCase().includes(textoFiltro)) {
                    const li = document.createElement("li");
                    const geolink = `<a href="geo:${item.latitude}, ${item.longitude}">Confira no Mapa</a>`;
                    li.innerHTML = `
                        <h3>${item.name}</h3>
                        <p><strong>Descrição:</strong><br> ${item.description}</p>
                        <p><strong>Endereço:</strong><br> ${item.address}</p>
                        <p><strong>Telefone:</strong><br> ${item.phone}</p>
                        <p class="geolink">${geolink}</p>
                        `;
                    list_places.appendChild(li);
                    areaImprimirJson.style.backgroundColor = 'white';
                }
            });
        })
        .catch(error => console.error("Erro ao carregar lista: ", error));
}

const btn_listarTodas = document.querySelector('#btn_lista');

btn_listarTodas.addEventListener("click", function() {
    load_Allplaces();
});

function load_Allplaces() {
    fetch("../institutions.json")
        .then(response => response.json())
        .then(data => {
            const list_places = document.getElementById("list_places");
            list_places.innerHTML = ""; // Limpa a lista

            data.institutions.forEach(item => {
                const li = document.createElement("li");
                const geolink = `<a href="geo:${item.latitude},${item.longitude}">Confira no Mapa</a>`;
                li.innerHTML = `
                    <h3>${item.name}</h3>
                    <p><strong>Descrição:</strong><br> ${item.description}</p>
                    <p><strong>Endereço:</strong><br> ${item.address}</p>
                    <p><strong>Telefone:</strong><br> ${item.phone}</p>
                    <p class="geolink">${geolink}</p>
                    `;
                list_places.appendChild(li);
                areaImprimirJson.style.backgroundColor = 'white';
            });
        })
        .catch(error => console.error("Erro ao carregar lista: ", error));
}
