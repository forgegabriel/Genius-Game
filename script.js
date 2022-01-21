//Genius buttons activation

function changeTransparency(div, shouldBeOn) {
    if (shouldBeOn) {
        div.classList.add("opacity-change")
        console.log(event.type);
    } else {
        div.classList.remove("opacity-change")
        console.log(event.type);
    }
}

//verifica click de mouse ou toque na tela
function inputClickDown() {
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

function inputClickUp() {
    if (!screenWasTouched[1]) {
    }
    if (event.type === "touchend") {
        screenWasTouched[1] = true;
        if (btnIsDown) {
            btnIsDown = false;
            changeTransparency(this, btnIsDown);
        }
    } else {
        if (btnIsDown) {
            btnIsDown = false;
            changeTransparency(this, btnIsDown);
        }
        screenWasTouched[1] = false;
    }
}

const colorBtn = [];
colorBtn[0] = document.getElementById("green-btn");
colorBtn[1] = document.getElementById("red-btn");
colorBtn[2] = document.getElementById("yellow-btn");
colorBtn[3] = document.getElementById("blue-btn");
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

let sheffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {

    }
}
