let gridCell = document.querySelectorAll('.cell');
let turn = 'X';
let arrMatch = [];
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// function to change turn 
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
}

// function to check for win 
function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Check for a draw
    const isDraw = gameState.every(cell => cell !== '');
    if (isDraw && !roundWon) {
        drawMessage();
        gameActive = false;
        return;
    }
    if (roundWon) {
        winningMessage();
        gameActive = false;
        return;
    }
}

function drawMessage() {
    let drawText = document.querySelector('.game-status');
    drawText.innerText = `Nobody has won -_-`;
}
function winningMessage() {
    let text = document.querySelector('.game-status');
    turn = changeTurn();
    text.innerText = `Player '${turn}' has won`;
}
function restartMessage() {
    let text = document.querySelector('.game-status');
    text.innerText = '';
}
// game logic 
gridCell.forEach((items) => {
    items.addEventListener('click', () => {
        if (gameActive) {
            const cellIndex = parseInt(items.getAttribute('data-cell-index'));
            if (gameState[cellIndex] === '') {
                items.innerText = turn;
                gameState[cellIndex] = turn;
                turn = changeTurn();
                checkWin();
            }
        }
    });
});

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// restart button login 
document.getElementById('button').addEventListener('click', restartGame)
function restartGame() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
    restartMessage();
};