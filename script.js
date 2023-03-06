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

    function renderGameboard() {

        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
        addCells();
    
    }
    return { tictactoe, renderGameboard };
})();

const playerFactory = (name, marker) => ({name, marker});

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

const gameController = (() => {
    function updateGameBoardView() {
        gameboard.renderGameboard();

        const cells = document.querySelectorAll('.box');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const text = cell.textContent;
                let cellId;
                if (text === '') {
                    console.log(e.target.dataset.id);
                    cellId = e.target.dataset.id;
                    gameController.addMarker(cellId);
                }
            });
        });
    }

    function addMarker(cellId) {
        if (cellId === '1') {
            gameboard.tictactoe[0][0] = 'X'; 
            console.log(gameboard.tictactoe);
        } else if (cellId === '2') {
            gameboard.tictactoe[0][1] = '2';
            console.log(gameboard.tictactoe);
        }   
        updateGameBoardView();
    }

    function createNewGame() {
        updateGameBoardView();
    }

    return { addMarker, createNewGame };
})();

gameController.createNewGame();
