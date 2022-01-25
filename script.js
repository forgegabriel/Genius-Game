//Genius buttons activation

function changeTransparency(div, shouldBeOn) {
    if (shouldBeOn) {
        switch (div.id) {
            case "green-btn":
                sndGreen.currentTime = 0;
                sndGreen.play();
                break;
            case "red-btn":
                sndRed.currentTime = 0;
                sndRed.play();
                break;
            case "yellow-btn":
                sndYellow.currentTime = 0;
                sndYellow.play();
                break;
            case "blue-btn":
                sndBlue.currentTime = 0;
                sndBlue.play();
                break;
        }
        div.classList.add("opacity-change");
    } else {
        div.classList.remove("opacity-change");
    }
}

//verifica click de mouse ou toque na tela
function inputClickDown() {
    if (canPressBtn) {
        if (event.type === "touchstart") {
            screenWasTouched[0] = true;
            btnIsDown = true;
            changeTransparency(this, btnIsDown);
        } else if(event.button === 0) {
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
const starBtn = document.getElementById("iniciar-jogo-btn");
const jogoInfo = document.getElementById("jogo-info");
const middle = document.getElementById("central-circle");
const pontosDiv = document.getElementById("pontos-jogo");
const sndGreen = new Audio("audio/greenkey.mp3");
const sndRed = new Audio("audio/redkey.mp3");
const sndYellow = new Audio("audio/yellowkey.mp3");
const sndBlue = new Audio("audio/bluekey.mp3");
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
let primeiraVez = true;
const btnCores = [
    "green-btn",
    "red-btn",
    "yellow-btn",
    "blue-btn"
];

function iniciarJogo() {
    if (canPressBtn) {
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
    playGame();
}

function playGame() {
    let relogio = 0;
    let blinkBtnSeq = setInterval(() => {
        changeTransparency(colorBtn[seqCores[relogio]], true);
        setTimeout(() => {
            changeTransparency(colorBtn[seqCores[relogio]], false);
            if (relogio === (seqCores.length - 1)) {
                canPressBtn = true;
                jogoInfo.innerHTML = "Reproduza a sequência:";
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
                    setTimeout(() => {
                        continuarJogo()
                    }, 300); 
                }
            } else {
                jogoInfo.innerHTML = "Você errou";
                jogoAtivo = false;
            }
        }
    }
}