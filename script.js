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

const gameController = (() => {
    const playerOne = playerFactory('Player 1', 'X');
    const playerTwo = playerFactory('Player 2', 'O');

    let player = playerOne;

    const tictactoeCellIds = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ]
    
    const boardContainer = document.getElementById('gameboard');
    const handleClickableBox = e => {
        if (!e.target.classList.contains('box')) {
            return;
        }
        if (e.target.textContent !== '') {
            return;
        }
        e.target.textContent = gameController.makePlay(e.target);
    }

    function changeTurn() {
        player = player === playerOne ? playerTwo : playerOne;
    }

    function highlightWinningCell(position) {
        const cellId = tictactoeCellIds[position[0]][position[1]];
        const element = document.querySelector(`[data-id='${cellId}']`);
        element.classList.add('highlight');
    }

    function highlightWinningLine(positions) {
        for (let i = 0; i < positions.length; i++) {
            highlightWinningCell(positions[i]);
        }
    }

    function checkWin() {        

        const fullBoard = gameboard.tictactoe.every(row => row.every(cell => cell !== ''));
        
        function removeListener() {
            boardContainer.removeEventListener('click', handleClickableBox);
        }

        for (let i = 0; i < 3; i++) {
            if (gameboard.tictactoe[0][i] === player.marker && gameboard.tictactoe[1][i] === player.marker && gameboard.tictactoe[2][i] === player.marker) {
                highlightWinningLine([[0, i], [1, i], [2, i]]);
                removeListener();
            } else if (gameboard.tictactoe[i][0] === player.marker && gameboard.tictactoe[i][1] === player.marker && gameboard.tictactoe[i][2] === player.marker) {
                highlightWinningLine([[i, 0], [i, 1], [i, 2]]);
                removeListener();
            } else if (gameboard.tictactoe[0][0] === player.marker && gameboard.tictactoe[1][1] === player.marker && gameboard.tictactoe[2][2] === player.marker) {                
                highlightWinningLine([[0, 0], [1, 1], [2, 2]]);
                removeListener();
            } else if (gameboard.tictactoe[2][0] === player.marker && gameboard.tictactoe[1][1] === player.marker && gameboard.tictactoe[0][2] === player.marker) {
                highlightWinningLine([[2, 0], [1, 1], [0, 2]]);
                removeListener();
            } else if (fullBoard) {
                removeListener();
            }
        }
    }

    function makePlay(cell) {
        gameboard.placeMarker(cell.dataset.id, player.marker);
        const playedMarker = player.marker;

        checkWin();
        changeTurn();
        return playedMarker;
    }

    function resetGameboard() {
        gameboard.tictactoe = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]

        gameboard.renderGameboard();
    }

    function newGame() {         
        resetGameboard();
        player = playerOne;

        const highlightedCells = document.querySelectorAll('.highlight');
        highlightedCells.forEach(cell => {
            cell.classList.remove('highlight');
        }) 
        boardContainer.addEventListener('click', handleClickableBox);
    }

    resetGameboard();

    return { makePlay, boardContainer, handleClickableBox, newGame};
    
})();


gameController.boardContainer.addEventListener('click', gameController.handleClickableBox);
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', gameController.newGame);