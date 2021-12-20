let random = null;

let check = null;

let maxSeconds = 20;

let count = 0;

const whacPositions = [
    "topOne",
    "topTwo",
    "topThree",
    "middleOne",
    "middleTwo",
    "middleThree",
    "bottomOne",
    "bottomTwo",
    "bottomThree"
];

const flashRed = className => {
    const square = document.querySelector(`.whacAMole.${className}`);
    square.classList.add('hitMole');
    setTimeout(() => {
        square.classList.remove('hitMole');
    }, 300);
}

const changeMolePosition = () => {
    const mole = document.querySelector(".whacAMole.mole");
    if(mole){
        mole.classList.remove("mole");
    }
    const randomIndex = Math.floor(Math.random() * whacPositions.length);
    const newMolePosition = whacPositions[randomIndex];
    document.querySelector(`.whacAMole.${newMolePosition}`).classList.add("mole");
}

const increamentWhacCount = () => {
    count = document.getElementById("whacAMoleCount").innerText;
    document.getElementById("whacAMoleCount").innerText = parseInt(count) + 1;
}

const whacMole = className => {
    const square = document.querySelector(`.whacAMole.${className}`);
    const hitMole = square.classList.contains("mole");
    if(hitMole){
        increamentWhacCount();
        flashRed(className);
    }
}

const randomizeMole = () => {
    random = setInterval(() => {
        changeMolePosition();
    }, 1000);
}

const whacAMoleMenuStart = () => {
    document.getElementById("whacAMoleHome").toggleAttribute("nodisplay");
    document.getElementById("whacAMoleDirections").toggleAttribute("nodisplay");
}

const resetwhacAMoleGame = () => {
    document.getElementById("whacAMoleHome").toggleAttribute("nodisplay");
    document.getElementById("whacAMoleBoard").toggleAttribute("nodisplay");
    clearInterval(random);
    clearInterval(check);
    count = 0;
}

const startTimer = () => {
    document.getElementById("whacAMoleCountDown").innerText = maxSeconds;
    check = setInterval(() => {
        const seconds = parseInt(document.getElementById("whacAMoleCountDown").innerText);
        const newCount = seconds - 1;
        if(!newCount){
            resetwhacAMoleGame();
        } else {
            document.getElementById("whacAMoleCountDown").innerText = newCount;
        }
    }, 1000);
}

const whacAMoleStart = () => {
    document.getElementById("whacAMoleDirections").toggleAttribute("nodisplay");
    document.getElementById("whacAMoleBoard").toggleAttribute("nodisplay");
    randomizeMole();
    startTimer();
    document.getElementById("whacAMoleCount").innerText = count;
}