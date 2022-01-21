function activateTransparency() {
    
    console.log();
    this.classList.add("opacity-change");
}

function deactivateTransparency() {
    
    this.classList.remove("opacity-change");
}

const colorBtn = [];
colorBtn[0] = document.getElementById("green-btn");
colorBtn[1] = document.getElementById("red-btn");
colorBtn[2] = document.getElementById("yellow-btn");
colorBtn[3] = document.getElementById("blue-btn");

for (let i = 0; i < 4; i++) {
    colorBtn[i].addEventListener("mousedown", activateTransparency);
    colorBtn[i].addEventListener("mouseup", deactivateTransparency);
    colorBtn[i].addEventListener("mouseout", deactivateTransparency);
}