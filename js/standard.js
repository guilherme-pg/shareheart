const btn_abrirMenuHamburguer = document.querySelector(".button_collapse_menu");
const secao_menuhamburguer = document.querySelector(".menu-hamburguer-content");
const btn_fecharMenuHamburguer = document.querySelector(".btn-close-hamburguer");

// COLLAPSE MENU and CLOSE
btn_abrirMenuHamburguer.addEventListener("click", function() {
    if (secao_menuhamburguer.style.display == "" || secao_menuhamburguer.style.display == "none") {
        secao_menuhamburguer.style.display = "flex";
    } else {
        secao_menuhamburguer.style.display = "none";
    }
});
btn_fecharMenuHamburguer.addEventListener("click", function() {
    secao_menuhamburguer.style.display = "none";
} )


