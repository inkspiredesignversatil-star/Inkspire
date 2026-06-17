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