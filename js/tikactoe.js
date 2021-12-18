let isCpuTurnInTikTacToe = false;
const selectionSquares = {
    1: {
        one: [2, 3],
        two: [4, 7]
    },
    2: {
        one: [1, 3],
        two: [5, 8]
    },
    3: {
        one: [1, 2],
        two: [6, 9]
    },
    4: {
        one: [1, 7],
        two: [5, 6]
    },
    5: {
        one: [2, 8],
        two: [4, 6]
    },
    6: {
        one: [3, 9],
        two: [4, 5]
    },
    7: {
        one: [1, 4],
        two: [8, 9]
    },
    8: {
        one: [2, 5],
        two: [7, 9]
    },
    9: {
        one: [7, 8],
        two: [3, 6]
    }
}

const squaresWithX = [];

const squaresWithO = [];

const getAllSelectionOptionsInPath = square => {
    const {
        one,
        two
    } = selectionSquares[square];
    return [...one, ...two];
}

const optionIsSafe = arr => {
    let isSafe = true;
    arr.forEach(square => {
        if(!squareIsOpen(`${square}`)){
            isSafe = false;
        }
    });
    return isSafe;
}

const makeCpuSelection = square => {
    document.getElementById(square).classList.add("o");
    isCpuTurnInTikTacToe = false;
}

const makeComputerMove = () => {
    const safeSquares = [];
    const notSafeSquares = [];
    for(let square in selectionSquares){
        if(squareIsOpen(square)){
            const allSelectionOptions = getAllSelectionOptionsInPath(square);
            const isSafe = optionIsSafe(allSelectionOptions);
            if(isSafe){
                safeSquares.push(square);
            } else {
                notSafeSquares.push(square);
            }
        }
    }
    if(safeSquares.length){
        const randomSquare = Math.floor(Math.random() * safeSquares.length);
        makeCpuSelection(safeSquares[randomSquare]);
    } else {
        debugger
        const randomSquare = Math.floor(Math.random() * notSafeSquares.length);
        makeCpuSelection(notSafeSquares[randomSquare]);
    }
}

const squareIsOpen = id => {
    const squareHasAnX = squaresWithX.includes(id);
    const squareHasAnO = squaresWithO.includes(id);
    const squareIsClear = !squareHasAnX && !squareHasAnO;
    return squareIsClear;
}

const selectSquare = id => {
    if(!isCpuTurnInTikTacToe && squareIsOpen(id)){
        document.getElementById(id).classList.add("x");
        squaresWithX.push(id);
        isCpuTurnInTikTacToe = true;
        setTimeout(() => {
            makeComputerMove();
        }, 1000);
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
