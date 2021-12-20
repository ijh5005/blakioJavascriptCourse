let isCpuTurn = false;

const squaresWithX = [];

const squaresWithO = [];

let openSquares = [];

const hasX = id => {
    return document.getElementById(id).classList.contains("x");
}

const hasO = id => {
    return document.getElementById(id).classList.contains("o");
}

const hasXorO = id => {
    return (
        document.getElementById(id).classList.contains("x") ||
        document.getElementById(id).classList.contains("o")
    );
}

const getScoringId = array => {
    for(let i = 0; i < array.length; i++){
        const data = array[i];
        if(data[0] && data[1] && data[2]){
            return data[3];
        }
    }
}

const getXScoringChances = () => {
    const combinations = [
        [hasX(1), hasX(2), !hasXorO(3), 3], // horizontal [x=1, x=2, ox!=3]
        [!hasXorO(1), hasX(2), hasX(3), 1], // horizontal [ox!=1, x=2, x=3]
        
        [hasX(4), hasX(5), !hasXorO(6), 6], // horizontal [x=4, x=5, ox!=6]
        [!hasXorO(4), hasX(5), hasX(6), 4], // horizontal [ox!=4, x=5, x=6]
    
        [hasX(7), hasX(8), !hasXorO(9), 9], // horizontal [x=7, x=8, ox!=9]
        [!hasXorO(7), hasX(8), hasX(9), 7], // horizontal [ox!=7, x=8, x=9]
    
        [hasX(1), hasX(4), !hasXorO(7), 7], // vertical [x=1, x=4, ox!=7]
        [!hasXorO(1), hasX(4), hasX(7), 1], // vertical [ox!=1, x=4, x=7]
    
        [hasX(2), hasX(5), !hasXorO(8), 8], // vertical [x=2, x=5, ox!=8]
        [!hasXorO(2), hasX(5), hasX(8), 2], // vertical [ox!=2, x=5, x=8]
    
        [hasX(3), hasX(6), !hasXorO(9), 9], // vertical [x=3, x=6, ox!=9]
        [!hasXorO(3), hasX(6), hasX(9), 3], // vertical [ox!=3, x=6, x=9]
    
        [hasX(1), hasX(5), !hasXorO(9), 9], // diagnal [x=1, x=5, ox!=9]
        [!hasXorO(1), hasX(5), hasX(9), 1], // diagnal [ox!=1, x=5, x=9]
    
        [hasX(3), hasX(5), !hasXorO(7), 7], // diagnal [x=3, x=5, ox!=7]
        [!hasXorO(3), hasX(5), hasX(7), 3], // diagnal [ox!=3, x=5, x=7]
    ];
    return combinations;
}

const hasXScored = () => {
    const combinations = [
        [hasX(1), hasX(2), hasX(3)],
        [hasX(4), hasX(5), hasX(6)],
        [hasX(7), hasX(8), hasX(9)],
        [hasX(1), hasX(4), hasX(7)],
        [hasX(2), hasX(5), hasX(8)],
        [hasX(3), hasX(6), hasX(9)],
        [hasX(1), hasX(5), hasX(9)],
        [hasX(3), hasX(5), hasX(7)],
    ];
    for(let x = 0; x < combinations.length; x++){
        const data = combinations[x];
        if(data[0] && data[1] && data[2]){
            return true;
        }
    }
    return false;
}

const getOScoringChances = () => {
    const combinations = [
        [hasO(1), hasO(2), !hasXorO(3), 3], // horizontal [x=1, x=2, ox!=3]
        [!hasXorO(1), hasO(2), hasO(3), 1], // horizontal [ox!=1, x=2, x=3]
        
        [hasO(4), hasO(5), !hasXorO(6), 6], // horizontal [x=4, x=5, ox!=6]
        [!hasXorO(4), hasO(5), hasO(6), 4], // horizontal [ox!=4, x=5, x=6]
    
        [hasO(7), hasO(8), !hasXorO(9), 9], // horizontal [x=7, x=8, ox!=9]
        [!hasXorO(7), hasO(8), hasO(9), 7], // horizontal [ox!=7, x=8, x=9]
    
        [hasO(1), hasO(4), !hasXorO(7), 7], // vertical [x=1, x=4, ox!=7]
        [!hasXorO(1), hasO(4), hasO(7), 1], // vertical [ox!=1, x=4, x=7]
    
        [hasO(2), hasO(5), !hasXorO(8), 8], // vertical [x=2, x=5, ox!=8]
        [!hasXorO(2), hasO(5), hasO(8), 2], // vertical [ox!=2, x=5, x=8]
    
        [hasO(3), hasO(6), !hasXorO(9), 9], // vertical [x=3, x=6, ox!=9]
        [!hasXorO(3), hasO(6), hasO(9), 3], // vertical [ox!=3, x=6, x=9]
    
        [hasO(1), hasO(5), !hasXorO(9), 9], // diagnal [x=1, x=5, ox!=9]
        [!hasXorO(1), hasO(5), hasO(9), 1], // diagnal [ox!=1, x=5, x=9]
    
        [hasO(3), hasO(5), !hasXorO(7), 7], // diagnal [x=3, x=5, ox!=7]
        [!hasXorO(3), hasO(5), hasO(7), 3], // diagnal [ox!=3, x=5, x=7]
    ];
    return combinations;
}

const resetGame = () => {
    squaresWithX.length = 0;
    squaresWithO.length = 0;
    openSquares.length = 0;
    isCpuTurn = false;
    document.getElementById("tikTacToeHome").toggleAttribute("nodisplay");
    document.getElementById("tikTacToeBoard").toggleAttribute("nodisplay");
}

const makeCpuSelection = square => {
    isCpuTurn = false;
    squaresWithO.push(square);
    document.getElementById(square).classList.add("o");
}

const populateOpenSquares = () => {
    openSquares = [];
    const squares = document.getElementsByClassName("tictactoe");
    for(let i = 0; i < squares.length; i++){
        const data = squares[i];
        const isNotFilledWithX = data.classList.contains("x");
        const isNotFilledWithO = data.classList.contains("o");
        if(!isNotFilledWithX && !isNotFilledWithO){
            openSquares.push(data.id);
        }
    }
}

const playerScore = ply => {
    isCpuTurn = true;
    setTimeout(() => {
        if(ply === "cpu"){
            console.log("cpu scored");
        } else {
            console.log("ply scored");
        }
        resetGame();
    }, 2000);
}

const makeComputerMove = () => {
    const cpuScoreId = getScoringId(getOScoringChances());
    const plyScoreId = getScoringId(getXScoringChances());
    if(cpuScoreId){
        makeCpuSelection(`${cpuScoreId}`);
        playerScore("cpu");
    } else if(plyScoreId){
        makeCpuSelection(`${plyScoreId}`);
    } else {
        populateOpenSquares();
        const randonIndex = Math.floor(Math.random() * openSquares.length);
        makeCpuSelection(openSquares[randonIndex]);
    } 
}

const squareIsOpen = id => {
    const squareHasAnX = squaresWithX.includes(`${id}`);
    const squareHasAnO = squaresWithO.includes(`${id}`);
    const squareIsClear = !squareHasAnX && !squareHasAnO;
    return squareIsClear;
}

const selectSquare = id => {
    if(!isCpuTurn && squareIsOpen(id)){
        document.getElementById(id).classList.add("x");
        squaresWithX.push(id);
        if(hasXScored()){
            playerScore("ply");
        } else {
            isCpuTurn = true;
            setTimeout(() => {
                makeComputerMove();
            }, 1000);
        }
    }
}

const showTikTacToeDirections = () => {
    document.getElementById("tikTacToeGameDirections").toggleAttribute("nodisplay");
    document.getElementById("tikTacToeHome").toggleAttribute("nodisplay");
}

const tikTacToeGameStart = () => {
    document.getElementById("tikTacToeGameDirections").toggleAttribute("nodisplay");
    document.getElementById("tikTacToeBoard").toggleAttribute("nodisplay");
}
