//Genius buttons activation

function changeTransparency(div, shouldBeOn) {
    if (shouldBeOn) {
        div.classList.add("opacity-change")
    } else {
        console.log(div);
        div.classList.remove("opacity-change")
    }
}

//verifica click de mouse ou toque na tela
function inputClickDown() {
    if (canPressBtn) {
        if (event.type === "touchstart") {
            screenWasTouched[0] = true;
            btnIsDown = true;
            changeTransparency(this, btnIsDown);
        } else {
            if (!screenWasTouched[0]) {
                btnIsDown = true;
                changeTransparency(this, btnIsDown);
            }
            screenWasTouched[0] = false;
        }
    }
}

function inputClickUp() {
    if (canPressBtn) {
        if (event.type === "touchend") {
            screenWasTouched[1] = true;
            if (btnIsDown) {
                btnIsDown = false;
                changeTransparency(this, btnIsDown);
                seqPlayer.push(btnCores.indexOf(this.id));
                verify();
            }
        } else {
            if (btnIsDown) {
                btnIsDown = false;
                changeTransparency(this, btnIsDown);
                seqPlayer.push(btnCores.indexOf(this.id));
                verify();
            }
            screenWasTouched[1] = false;
        }
    }
}

const colorBtn = [];
colorBtn[0] = document.getElementById("green-btn");
colorBtn[1] = document.getElementById("red-btn");
colorBtn[2] = document.getElementById("yellow-btn");
colorBtn[3] = document.getElementById("blue-btn");
let starBtn = document.getElementById("iniciar-jogo-btn");
let jogoInfo = document.getElementById("jogo-info");
let middle = document.getElementById("central-circle");
let pontosDiv = document.getElementById("pontos-jogo");
let btnIsDown = false;
let screenWasTouched = [false, false];

for (let i = 0; i < 4; i++) {
    colorBtn[i].addEventListener("mousedown", inputClickDown);
    colorBtn[i].addEventListener("mouseup", inputClickUp);
    colorBtn[i].addEventListener("mouseout", inputClickUp);
    colorBtn[i].addEventListener("touchstart", inputClickDown);
    colorBtn[i].addEventListener("touchend", inputClickUp);
}


//Reproduzindo o jogo
let canPressBtn = true;
let jogoAtivo = false;
let seqCores = [];
let seqPlayer = [];
let pontos = 0;
const btnCores = [
    "green-btn",
    "red-btn",
    "yellow-btn",
    "blue-btn"
];

function iniciarJogo() {
    if(canPressBtn) {
        canPressBtn = false;
        jogoAtivo = true;
        pontos = 0;
        pontosDiv.innerHTML = pontos;
        starBtn.innerHTML = "Restart";
        seqCores = [];
        continuarJogo();
    }
}

function continuarJogo() {
    seqPlayer = [];
    jogoInfo.innerHTML = "&nbsp;";
    seqCores.push(Math.floor(Math.random() * 4));
    play();
}

function play() {
    console.log("play");
    let relogio = 0;
    let blinkBtnSeq = setInterval(() => {
        changeTransparency(colorBtn[seqCores[relogio]], true);
        setTimeout(() => {
            changeTransparency(colorBtn[seqCores[relogio]], false);
            if (relogio === (seqCores.length - 1)) {
                canPressBtn = true;
                jogoInfo.innerHTML = "Reproduza a sequência:";
                console.log("stop");
                clearInterval(blinkBtnSeq);
            }
            relogio = relogio + 1;
        }, 200);
    }, 500);
}

function verify() {
    if (jogoAtivo) {
        for (let i in seqPlayer) {
            if (seqCores[i] === seqPlayer[i]) {
                if (i == (seqCores.length - 1)) {
                    canPressBtn = false;
                    pontos++;
                    pontosDiv.innerHTML = pontos;
                    continuarJogo();
                }
            } else {
                pontos = 0;
                pontosDiv.innerHTML = pontos;
                jogoInfo.innerHTML = "Você errou";
                jogoAtivo = false;
            }
        }
    }
}