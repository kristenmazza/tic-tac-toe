/* eslint-disable no-plusplus */

const gameboard = (() => {
    
    let tictactoe = [
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
            tictactoe[0][0] = marker; 
        } else if (cell === '2') {
            tictactoe[0][1] = marker;
        }  else if (cell === '3') {
            tictactoe[0][2] = marker;
        }  else if (cell === '4') {
            tictactoe[1][0] = marker;
        }  else if (cell === '5') {
            tictactoe[1][1] = marker;
        }  else if (cell === '6') {
            tictactoe[1][2] = marker;
        }  else if (cell === '7') {
            tictactoe[2][0] = marker;
        }  else if (cell === '8') {
            tictactoe[2][1] = marker;
        }  else {
            tictactoe[2][2] = marker;
        }  
    }

    function findWinningCells(player) {
        for (let i = 0; i < 3; i++) {
            if (tictactoe[0][i] === player.marker && tictactoe[1][i] === player.marker && tictactoe[2][i] === player.marker) {
                return [[0, i], [1, i], [2, i]];
            } if (tictactoe[i][0] === player.marker && tictactoe[i][1] === player.marker && tictactoe[i][2] === player.marker) {
                return [[i, 0], [i, 1], [i, 2]];
            } if (tictactoe[0][0] === player.marker && tictactoe[1][1] === player.marker && tictactoe[2][2] === player.marker) {                
                return [[0, 0], [1, 1], [2, 2]];
            } if (tictactoe[2][0] === player.marker && tictactoe[1][1] === player.marker && tictactoe[0][2] === player.marker) {
                return [[2, 0], [1, 1], [0, 2]];
            }
        }
        return false;
    }

    function isFull() {
        return tictactoe.every(row => row.every(cell => cell !== ''));
    }

    function clearBoard() {
        tictactoe = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    }

    function renderGameboard() {
        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
        addCells();

    }

    return { placeMarker, renderGameboard, findWinningCells, isFull, clearBoard };
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

        const fullBoard = gameboard.isFull();
        
        function removeListener() {
            boardContainer.removeEventListener('click', handleClickableBox);
        }

        const winningCells = gameboard.findWinningCells(player);

        if (fullBoard) {
            removeListener();
        }

        if (winningCells) {
            removeListener();
            highlightWinningLine(winningCells);
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
        gameboard.clearBoard();
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