// FORÇA O SITE A FICAR NO TOPO ABSOLUTO SEM PULAR
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

if (window.location.hash) {
    window.scrollTo(0, 0);
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}

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
setTimeout(reveal, 200);


// ==========================================
// LÓGICA DO ÁLBUM COM TRANSICÃO E PONTINHOS
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnFechar = document.querySelector(".fechar-lightbox");
const dotsContainer = document.getElementById("dots-container");
const cardsPortfolio = document.querySelectorAll(".card");

let imagensAlbum = [];
let indexAtual = 0;
let temporizadorSlide = null;

if(lightbox) {
    lightbox.classList.remove("ativo");
    lightbox.style.display = "none";
}

function preCarregarImagens(listaImagens) {
    listaImagens.forEach((url) => {
        const imgFake = new Image();
        imgFake.src = url.trim();
    });
}

function iniciarSlideAutomatico() {
    pararSlideAutomatico();
    temporizadorSlide = setInterval(() => {
        proximaImagem();
    }, 3500); // Passa a foto a cada 3.5 segundos
}

function pararSlideAutomatico() {
    if (temporizadorSlide) {
        clearInterval(temporizadorSlide);
    }
}

// Cria os pontinhos de forma dinâmica baseada na quantidade de fotos
function gerarPontinhos() {
    dotsContainer.innerHTML = ""; // Limpa os antigos
    if (imagensAlbum.length <= 1) return; // Se for só 1 imagem, não precisa de pontos

    imagensAlbum.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === indexAtual) dot.classList.add("dot-ativo");
        dotsContainer.appendChild(dot);
    });
}

function atualizarPontinhos() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index === indexAtual) {
            dot.classList.add("dot-ativo");
        } else {
            dot.classList.remove("dot-ativo");
        }
    });
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
            
            gerarPontinhos();
            mostrarImagem(indexAtual);
            
            lightbox.style.display = "flex";
            setTimeout(() => {
                lightbox.classList.add("ativo");
            }, 10);
            
            document.body.style.overflow = "hidden";
            
            if (imagensAlbum.length > 1) {
                iniciarSlideAutomatico();
            }
        }
    });
});

function mostrarImagem(index) {
    if(imagensAlbum[index]) {
        // Tira a classe de visível para fazer o efeito de sumir (fade-out)
        lightboxImg.classList.remove("foto-visivel");
        
        setTimeout(() => {
            lightboxImg.src = imagensAlbum[index].trim();
            // Recarrega a classe para fazer a nova foto surgir (fade-in)
            lightboxImg.classList.add("foto-visivel");
            atualizarPontinhos();
        }, 200); // Tempo rápido da piscada da transição
    }
}

function proximaImagem() {
    indexAtual = (indexAtual + 1) % imagensAlbum.length;
    mostrarImagem(indexAtual);
}

function fecharAlbum() {
    pararSlideAutomatico();
    lightbox.classList.remove("ativo");
    lightboxImg.classList.remove("foto-visivel");
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
    document.body.style.overflow = "auto";
}

btnFechar.addEventListener("click", fecharAlbum);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) fecharAlbum();
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
// ==========================================
// ENVIO SEGURO E OCULTO DE FORMULÁRIO (AJAX)
// ==========================================
const formFeedback = document.getElementById("feedback-form");
const btnEnviarFeedback = document.getElementById("btn-enviar-feedback");

if(formFeedback) {
    formFeedback.addEventListener("submit", function(e) {
        e.preventDefault(); // Impede o redirecionamento bizarro da página
        
        // Desativa o botão temporariamente para evitar cliques repetidos (Double-Submit Attack)
        btnEnviarFeedback.disabled = true;
        btnEnviarFeedback.innerText = "Enviando com segurança...";

        const formData = new FormData(this);
        
        // Endpoint ocultado e disparado de forma assíncrona pelo navegador
        fetch("https://formspree.io/f/mojzggeg", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                btnEnviarFeedback.innerText = "✓ Avaliação Enviada!";
                btnEnviarFeedback.style.background = "#25D366";
                btnEnviarFeedback.style.boxShadow = "0 0 15px #25D366";
                formFeedback.reset(); // Limpa os campos
            } else {
                throw new Error('Erro no envio');
            }
        })
        .catch(error => {
            btnEnviarFeedback.disabled = false;
            btnEnviarFeedback.innerText = "Erro ao enviar. Tente novamente.";
            btnEnviarFeedback.style.background = "#ff007f";
        });
    });
}