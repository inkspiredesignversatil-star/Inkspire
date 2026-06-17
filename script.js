// FORÇA O SITE A COMEÇAR DO TOPO ABSOLUTO (PONTO ZERO)
// Desativa temporariamente a rolagem suave na abertura para evitar "pulos"
document.documentElement.style.scrollBehavior = "auto";

window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    
    // Devolve a rolagem suave após garantir que o site abriu no topo
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth";
    }, 100);
});

window.onload = function() {
    window.scrollTo(0, 0);
};
// Efeito do ponto de luz (Glow) seguindo o mouse
const glow = document.createElement("div");
glow.classList.add("glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// Ativar fundo do Header ao rolar a página
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        header.classList.add("ativo");
    } else {
        header.classList.remove("ativo");
    }
});

// Animação de surgimento dos elementos (Reveal)
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

// CORREÇÃO PREVENTIVA: Só roda o reveal inicial depois que a página carregar 100%
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(reveal, 100);
});


// LÓGICA DO ÁLBUM (LIGHTBOX) - TOTALMENTE ATUALIZADA E BLINDADA
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnFechar = document.querySelector(".fechar-lightbox");
const btnAnterior = document.querySelector(".anterior");
const btnProxima = document.querySelector(".proxima");
const cardsPortfolio = document.querySelectorAll(".card");

let imagensAlbum = [];
let indexAtual = 0;

// Garante que o álbum comece limpo e escondido no carregamento
if(lightbox) {
    lightbox.classList.remove("ativo");
    lightbox.style.display = "none";
}

// Abrir o álbum ao clicar no card
cardsPortfolio.forEach(card => {
    card.addEventListener("click", () => {
        const albumData = card.getAttribute("data-album");
        if (albumData) {
            imagensAlbum = albumData.split(","); // Transforma a lista em Array
            indexAtual = 0;
            mostrarImagem(indexAtual);
            
            lightbox.style.display = "flex"; // Força a exibição estrutural
            setTimeout(() => {
                lightbox.classList.add("ativo"); // Ativa a transição de opacidade/zoom do CSS
            }, 10);
            
            document.body.style.overflow = "hidden"; // Impede que o fundo role no celular
        }
    });
});

function mostrarImagem(index) {
    if(imagensAlbum[index]) {
        lightboxImg.src = imagensAlbum[index].trim();
    }
}

// Mudar para a próxima foto
btnProxima.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita fechar o modal
    indexAtual = (indexAtual + 1) % imagensAlbum.length;
    mostrarImagem(indexAtual);
});

// Mudar para a foto anterior
btnAnterior.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita fechar o modal
    indexAtual = (indexAtual - 1 + imagensAlbum.length) % imagensAlbum.length;
    mostrarImagem(indexAtual);
});

// Função centralizada para fechar com animação suave
function fecharAlbum() {
    lightbox.classList.remove("ativo");
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300); // Aguarda o fade-out do CSS terminar
    document.body.style.overflow = "auto"; // Libera a rolagem do site novamente
}

// Fechar nos botões e cliques fora da imagem
btnFechar.addEventListener("click", fecharAlbum);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        fecharAlbum();
    }
});