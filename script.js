/* eslint-disable no-plusplus */

const gameboard = (() => {
    
    const tictactoe = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const board = document.getElementById('gameboard');

    // Add gameboard cells
    function addCells() {
        let cellNumber = 1;
        function createCell(input) {
            const cell = document.createElement('div');
            cell.classList.add('box');
            board.appendChild(cell);
            cell.textContent = input;
            cell.setAttribute('data-id', `${cellNumber}`);
        }

        for (let row = 0; row < tictactoe.length; row++) {
            for (let column = 0; column < tictactoe.length; column++) {
                const input = tictactoe[row][column];
                createCell(input);
                cellNumber++;
            }
        }
    }

    // Place marker in the array
    function placeMarker(cell, marker) {
        if (cell === '1') {
            gameboard.tictactoe[0][0] = marker; 
        } else if (cell === '2') {
            gameboard.tictactoe[0][1] = marker;
        }  else if (cell === '3') {
            gameboard.tictactoe[0][2] = marker;
        }  else if (cell === '4') {
            gameboard.tictactoe[1][0] = marker;
        }  else if (cell === '5') {
            gameboard.tictactoe[1][1] = marker;
        }  else if (cell === '6') {
            gameboard.tictactoe[1][2] = marker;
        }  else if (cell === '7') {
            gameboard.tictactoe[2][0] = marker;
        }  else if (cell === '8') {
            gameboard.tictactoe[2][1] = marker;
        }  else {
            gameboard.tictactoe[2][2] = marker;
        }  
    }

    function renderGameboard() {

        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
        addCells();
    
    }
    return { tictactoe, placeMarker, renderGameboard };
})();

const playerFactory = (name, marker) => ({name, marker});

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

const gameController = (() => {
    gameboard.renderGameboard();

    let marker = 'O';

    function changeTurn() {
        if (marker === 'X') {
            marker = 'O';
        } else {
            marker = 'X';
        }
    }

    function checkWin() {        

        const fullBoard = gameboard.tictactoe.every(row => row.every(cell => cell !== ''));
        const boardContainer = document.getElementById('gameboard');
        
        function removeListener() {
            boardContainer.removeEventListener('click', handleClickableBox);
        }

        for (let i = 0; i < 3; i++) {
            if (gameboard.tictactoe[0][i] === marker && gameboard.tictactoe[1][i] === marker && gameboard.tictactoe[2][i] === marker) {
                console.log("col win");
                removeListener();
            } else if (gameboard.tictactoe[i][0] === marker && gameboard.tictactoe[i][1] === marker && gameboard.tictactoe[i][2] === marker) {
                console.log("row win");
                removeListener();
            } else if (gameboard.tictactoe[0][0] === marker && gameboard.tictactoe[1][1] === marker && gameboard.tictactoe[2][2] === marker ||
                       gameboard.tictactoe[2][0] === marker && gameboard.tictactoe[1][1] === marker && gameboard.tictactoe[0][2] === marker) {
                console.log("horizontal win");
                removeListener();
            } else if (fullBoard) {
                console.log("tie");
                removeListener();
            }
        }
    }

    function addMarker(cell) {
        changeTurn();

        if (cell.textContent === '') {
            gameboard.placeMarker(cell.dataset.id, marker);
            cell.textContent = marker;
        }
        
        checkWin();
    }

    return { addMarker };
    
})();


const boardContainer = document.getElementById('gameboard');
const handleClickableBox = e => {
    if (!e.target.classList.contains('box')) {
        return;
    }
    gameController.addMarker(e.target);
}

// function handleClickableBox(e) {
//     if (!e.target.classList.contains('box')) {
//         return;
//     }
//     gameController.addMarker(e.target);
// }

boardContainer.addEventListener('click', handleClickableBox);
