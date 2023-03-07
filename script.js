/* eslint-disable no-plusplus */

const gameboard = (() => {
    const tictactoe = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const board = document.getElementById('gameboard');

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
        }  else if (cell === '9') {
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

    function addMarker(cell, marker) {
        if (cell.textContent === '') {
            gameboard.placeMarker(cell.dataset.id, marker);
            cell.textContent = marker;
        }
    }

    return { addMarker };
})();

const cells = document.querySelectorAll('.box');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        gameController.addMarker(cell, 'O');
    });
});