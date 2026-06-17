const glow = document.createElement("div");

glow.classList.add("glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        header.classList.add("ativo");
    }else{
        header.classList.remove("ativo");
    }

});

const reveals = document.querySelectorAll(".reveal");

function reveal(){

    reveals.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        const visible = 150;

        if(top < window.innerHeight - visible){

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();
// LÓGICA DO ÁLBUM (LIGHTBOX)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnFechar = document.querySelector(".fechar-lightbox");
const btnAnterior = document.querySelector(".anterior");
const btnProxima = document.querySelector(".proxima");
const cardsPortfolio = document.querySelectorAll(".card");

let imagensAlbum = [];
let indexAtual = 0;

// Abrir o álbum ao clicar no card
cardsPortfolio.forEach(card => {
    card.addEventListener("click", () => {
        const albumData = card.getAttribute("data-album");
        if (albumData) {
            imagensAlbum = albumData.split(","); // Transforma a lista de textos em um Array
            indexAtual = 0;
            mostrarImagem(indexAtual);
            lightbox.style.display = "flex";
        }
    });
});

function mostrarImagem(index) {
    lightboxImg.src = imagensAlbum[index];
}

// Mudar para a próxima foto
btnProxima.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita fechar o modal sem querer
    indexAtual = (indexAtual + 1) % imagensAlbum.length;
    mostrarImagem(indexAtual);
});

// Mudar para a foto anterior
btnAnterior.addEventListener("click", (e) => {
    e.stopPropagation();
    indexAtual = (indexAtual - 1 + imagensAlbum.length) % imagensAlbum.length;
    mostrarImagem(indexAtual);
});

// Fechar o álbum
btnFechar.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Fechar se clicar no fundo preto
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});