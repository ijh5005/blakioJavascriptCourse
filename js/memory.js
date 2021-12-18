const memorySquareIds = ["memoryGameTopLeft", "memoryGameTopRight", "memoryGameBottomLeft", "memoryGameBottomRight"];
const cpuSequence = [];
const userSequence = [];
let memoryCpuTurn = true;
let currentGuessIndex = 0;
let hasHighScore = localStorage.getItem("memoryGameHighScore");
if(!hasHighScore){
    localStorage.setItem("memoryGameHighScore", 0);
}

const setMemoryGameHighScore = score => {
    document.getElementById("memoryGameHighScore").innerText = score;
    localStorage.setItem("memoryGameHighScore", score);
}

setMemoryGameHighScore(hasHighScore);

const showMemoryGameDirections = () => {
    document.getElementById("memoryGameDirections").toggleAttribute("nodisplay");
}

const getRandomSquare = () => {
    const index = Math.floor(Math.random() * memorySquareIds.length);
    return memorySquareIds[index];
}

const highlighSquare = id => {
    document.getElementById(id).classList.add("cpuClick");
    setTimeout(() => {
        document.getElementById(id).classList.remove("cpuClick");
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
        memoryCpuTurn = false;
    }, elapseTime - 300);
}

const addHighlight = id => {
    if(!memoryCpuTurn){
        const classlist = document.getElementById(id).classList;
        if(!classlist.contains("playerClick")){
            document.getElementById(id).classList.add("playerClick");
        }
    }
}

const removeHighlight = id => {
    document.getElementById(id).classList.remove("playerClick");
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
    memoryCpuTurn = true;
    document.getElementById("memoryCount").innerText = 0;
    document.getElementById("memoryGameBoard").toggleAttribute("nodisplay");
    document.getElementById("memoryGameHomeScreen").toggleAttribute("nodisplay");
}

const increaseMemoryCount = () => {
    const count = document.getElementById("memoryCount").innerText;
    const newCount = parseInt(count) + 1;
    document.getElementById("memoryCount").innerText = newCount;

    const highScore = localStorage.getItem("memoryGameHighScore");
    if(newCount > parseInt(highScore)){
        setMemoryGameHighScore(newCount);
    }
}

const makeMemoryGuess = id => {
    if(!memoryCpuTurn){
        userSequence.push(id);
        guessedCorrectly = userSequence[currentGuessIndex] === cpuSequence[currentGuessIndex];
        if(!guessedCorrectly){
            youLoseInMemoryGame();
        } else {
            currentGuessIndex++;
        }
        atFinalGuess = currentGuessIndex === cpuSequence.length;
        if(atFinalGuess && guessedCorrectly){
            memoryCpuTurn = true;
            currentGuessIndex = 0;
            userSequence.length = 0;
            increaseMemoryCount();
            cpuTurnInMemoryGame();
        }
    }
}

const memoryGameStart = () => {
    document.getElementById("memoryGameDirections").toggleAttribute("nodisplay");
    document.getElementById("memoryGameBoard").toggleAttribute("nodisplay");
    document.getElementById("memoryGameHomeScreen").toggleAttribute("nodisplay");
    cpuTurnInMemoryGame();
}