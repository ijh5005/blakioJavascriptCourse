let random = null;

let check = null;

let maxSeconds = 20;

let count = 0;

let goHome = false;

let canClick = true;

const whakAMoleText = {
    intro: "Whak the mole to score! Click to play.",
    endText: "You have scored X"
}

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
    count = getById("whacAMoleCount").innerText;
    getById("whacAMoleCount").innerText = parseInt(count) + 1;
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
    const whakAMoleHome = getById("whakAMoleHome");
    toggleAttribute(whakAMoleHome, "nodisplay");

    const whacAMoleDirections = getById("whacAMoleDirections");
    toggleAttribute(whacAMoleDirections, "nodisplay");

    whacAMoleDirections.innerText = whakAMoleText.intro;
}

const resetwhacAMoleGame = () => {
    const whacAMoleDirections = getById("whacAMoleDirections");

    toggleAttribute(whacAMoleDirections, "nodisplay");
    toggleAttribute(whacAMoleDirections, "opacity");

    whacAMoleDirections.innerText = whakAMoleText.endText.replace("X", count);

    clearInterval(random);
    clearInterval(check);
    count = 0;
    canClick = false;
    setTimeout(() => {
        toggleAttribute(whacAMoleDirections, "opacity");
        toggleAttribute(whacAMoleDirections, "nodisplay");

        const whacAMoleBoard = getById("whacAMoleBoard");
        toggleAttribute(whacAMoleBoard, "nodisplay");

        const whakAMoleHome = getById("whakAMoleHome");
        toggleAttribute(whakAMoleHome, "nodisplay");

        canClick = true;
    }, 4000);
}

const startTimer = () => {
    getById("whacAMoleCountDown").innerText = maxSeconds;
    check = setInterval(() => {
        const seconds = parseInt(getById("whacAMoleCountDown").innerText);
        const newCount = seconds - 1;
        if(!newCount){
            resetwhacAMoleGame();
        } else {
            getById("whacAMoleCountDown").innerText = newCount;
        }
    }, 1000);
}

const whacAMoleStart = () => {
    if(canClick){
        const whacAMoleDirections = getById("whacAMoleDirections");toggleAttribute(whacAMoleDirections, "nodisplay");

        const whacAMoleBoard = getById("whacAMoleBoard");toggleAttribute(whacAMoleBoard, "nodisplay");

        randomizeMole();
        startTimer();
        getById("whacAMoleCount").innerText = count;
    }
}