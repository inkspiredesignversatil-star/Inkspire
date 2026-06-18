// FORÇA O SITE A FICAR NO TOPO ABSOLUTO SEM PULAR
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; // Desativa a memória de rolagem do navegador
}

// Limpa qualquer #id do link que faça o celular pular de seção ao carregar
if (window.location.hash) {
    window.scrollTo(0, 0);
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}

// Garante o topo no carregamento inicial
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
});

window.onload = function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
};


// ==========================================
// EFEITOS VISUAIS (GLOW E HEADER)
// ==========================================
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
    } else {
        header.classList.remove("ativo");
    }
});


// ==========================================
// ANIMAÇÃO DE SURGIMENTO (REVEAL)
// ==========================================
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

// Só ativa as animações depois que tudo estiver no lugar
setTimeout(reveal, 200);


// ==========================================
// LÓGICA DO ÁLBUM COM PASSO AUTOMÁTICO
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnFechar = document.querySelector(".fechar-lightbox");
const btnAnterior = document.querySelector(".anterior");
const btnProxima = document.querySelector(".proxima");
const cardsPortfolio = document.querySelectorAll(".card");

let imagensAlbum = [];
let indexAtual = 0;
let temporizadorSlide = null; // Guarda o controle do tempo do slide

if(lightbox) {
    lightbox.classList.remove("ativo");
    lightbox.style.display = "none";
}

// Pré-carrega as imagens na memória para não dar delay
function preCarregarImagens(listaImagens) {
    listaImagens.forEach((url) => {
        const imgFake = new Image();
        imgFake.src = url.trim();
    });
}

// Inicia o temporizador para passar sozinho
function iniciarSlideAutomatico() {
    pararSlideAutomatico(); // Garante que não vai duplicar cronômetros
    temporizadorSlide = setInterval(() => {
        proximaImagem();
    }, 3500); // 3500 milissegundos = 3,5 segundos por foto
}

// Para o temporizador quando fecha ou o usuário clica manualmente
function pararSlideAutomatico() {
    if (temporizadorSlide) {
        clearInterval(temporizadorSlide);
    }
}

cardsPortfolio.forEach(card => {
    const albumData = card.getAttribute("data-album");
    if (albumData) {
        const fotosDoCard = albumData.split(",");
        preCarregarImagens(fotosDoCard);
    }

    card.addEventListener("click", () => {
        const dadosDoAlbum = card.getAttribute("data-album");
        if (dadosDoAlbum) {
            imagensAlbum = dadosDoAlbum.split(",");
            indexAtual = 0;
            mostrarImagem(indexAtual);
            
            lightbox.style.display = "flex";
            setTimeout(() => {
                lightbox.classList.add("ativo");
            }, 10);
            
            document.body.style.overflow = "hidden";
            
            // Só ativa o slide automático se o álbum tiver mais de 1 foto
            if (imagensAlbum.length > 1) {
                iniciarSlideAutomatico();
            }
        }
    });
});

function mostrarImagem(index) {
    if(imagensAlbum[index]) {
        lightboxImg.src = imagensAlbum[index].trim();
    }
}

function proximaImagem() {
    indexAtual = (indexAtual + 1) % imagensAlbum.length;
    mostrarImagem(indexAtual);
}

function anteriorImagem() {
    indexAtual = (indexAtual - 1 + imagensAlbum.length) % imagensAlbum.length;
    mostrarImagem(indexAtual);
}

// Cliques manuais nas setas resetam o tempo para não pular rápido demais
btnProxima.addEventListener("click", (e) => {
    e.stopPropagation();
    proximaImagem();
    iniciarSlideAutomatico(); 
});

btnAnterior.addEventListener("click", (e) => {
    e.stopPropagation();
    anteriorImagem();
    iniciarSlideAutomatico();
});

function fecharAlbum() {
    pararSlideAutomatico(); // Desliga o temporizador ao fechar
    lightbox.classList.remove("ativo");
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
    document.body.style.overflow = "auto";
}

btnFechar.addEventListener("click", fecharAlbum);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharAlbum();
});

// BLOQUEIA O BOTÃO DIREITO DO MOUSE NO SITE INTEIRO
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});