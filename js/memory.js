const memorySquareIds = ["mgTopLeft", "mgTopRight", "mgBottomLeft", "mgBottomRight"];
const cpuSequence = [];
const userSequence = [];
let mgCpuTurn = true;
let currentGuessIndex = 0;

const setMemoryGameHighScore = score => {
    const mgHighScore = localStorage.getItem("mgHighScore");
    if(!mgHighScore){
        localStorage.setItem("mgHighScore", 0);
        score = localStorage.getItem("mgHighScore", 0);
    }
    getById("mgHighScore").innerText = score;
    localStorage.setItem("mgHighScore", score);
}

setMemoryGameHighScore(localStorage.getItem("mgHighScore"));

const showMGDirections = () => {
    toggleAttribute(getById("mgDirections"), "nodisplay");
}

const getRandomSquare = () => {
    const index = Math.floor(Math.random() * memorySquareIds.length);
    return memorySquareIds[index];
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

const cpuTurnInMemoryGame = () => {
    const randomSquare = getRandomSquare();
    cpuSequence.push(randomSquare);
    playSequence();
}

const youLoseInMemoryGame = () => {
    currentGuessIndex = 0;
    cpuSequence.length = 0;
    userSequence.length = 0;
    mgCpuTurn = true;
    getById("mgCount").innerText = 0;
    toggleAttribute(getById("mgBoard"), "nodisplay");
    toggleAttribute(getById("mgHomeScreen"), "nodisplay");
}

const increaseMemoryCount = () => {
    const count = getById("mgCount").innerText;
    const newCount = parseInt(count) + 1;
    getById("mgCount").innerText = newCount;

    const highScore = localStorage.getItem("mgHighScore");
    if(newCount > parseInt(highScore)){
        setMemoryGameHighScore(newCount);
    }
}

const makeMemoryGuess = id => {
    if(!mgCpuTurn){
        userSequence.push(id);
        guessedCorrectly = userSequence[currentGuessIndex] === cpuSequence[currentGuessIndex];
        if(!guessedCorrectly){
            youLoseInMemoryGame();
        } else {
            currentGuessIndex++;
        }
        atFinalGuess = currentGuessIndex === cpuSequence.length;
        if(atFinalGuess && guessedCorrectly){
            mgCpuTurn = true;
            currentGuessIndex = 0;
            userSequence.length = 0;
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