const memorySquareIds = [
    "mgTopLeft",
    "mgTopRight",
    "mgBottomLeft",
    "mgBottomRight"
];

const cpuSequence = [];

let mgCpuTurn = true;

let clickOrder = 0;

const showMGDirections = () => {
    toggleAttribute(getById("mgDirections"), "nodisplay");
}

setMemoryGameHighScore(localStorage.getItem("mgHighScore"));

const setMemoryGameHighScore = score => {
    const mgHighScore = localStorage.getItem("mgHighScore");
    if(!mgHighScore){
        localStorage.setItem("mgHighScore", 0);
        score = localStorage.getItem("mgHighScore", 0);
    }
    getById("mgHighScore").innerText = score;
    localStorage.setItem("mgHighScore", score);
}

const addHighlight = id => {
    if(!mgCpuTurn){
        const classlist = getById(id).classList;
        if(!classlist.contains("playerClick")){
            getById(id).classList.add("playerClick");
        }
    }
}

const removeHighlight = id => {
    getById(id).classList.remove("playerClick");
}

const highlighSquare = id => {
    getById(id).classList.add("cpuClick");
    setTimeout(() => {
        getById(id).classList.remove("cpuClick");
    }, 500);
}

const playSequence = () => {
    let elapseTime = 1000;
    cpuSequence.forEach(id => {
        setTimeout(() => {
            highlighSquare(id);
        }, elapseTime);
        elapseTime += 1000;
    });
    setTimeout(() => {
        mgCpuTurn = false;
    }, elapseTime - 300);
}

const cpuTurnInMemoryGame = () => {
    const randomSquare = getRandomIndexFromArray(memorySquareIds);
    cpuSequence.push(randomSquare);
    playSequence();
}

const youLoseInMemoryGame = () => {
    cpuSequence.length = 0;
    mgCpuTurn = true;
    getById("mgCount").innerText = 0;
    toggleAttribute(getById("mgBoard"), "nodisplay");
    toggleAttribute(getById("mgHomeScreen"), "nodisplay");
}

const setHighScore = count => {
    const highScore = localStorage.getItem("mgHighScore");
    if(count > parseInt(highScore)){
        setMemoryGameHighScore(count);
    }
}

const increaseMemoryCount = () => {
    const mgCount = getById("mgCount");
    const newCount = parseInt(mgCount.innerText) + 1;
    mgCount.innerText = newCount;
    setHighScore(newCount);
}

const makeMemoryGuess = box => {
    if(mgCpuTurn) return;
    if(box !== cpuSequence[clickOrder]){
        clickOrder = 0;
        youLoseInMemoryGame();
    } else {
        clickOrder++;
        if(cpuSequence.length === clickOrder){
            clickOrder = 0;
            mgCpuTurn = true;
            increaseMemoryCount();
            cpuTurnInMemoryGame();
        }
    }
}

const memoryGameStart = () => {
    toggleAttribute(getById("mgDirections"), "nodisplay");
    toggleAttribute(getById("mgBoard"), "nodisplay");
    toggleAttribute(getById("mgHomeScreen"), "nodisplay");
    cpuTurnInMemoryGame();
}