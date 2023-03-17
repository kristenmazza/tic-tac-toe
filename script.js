/* eslint-disable no-plusplus */

// Create a gameboard module/singleton generated by an IIFE.
const gameboard = (() => {
    
    let tictactoe = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const board = document.getElementById('gameboard');

    // Add gameboard cells.
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

    // Place player's marker in the array.
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

    // Return the array positions of the winning cells.
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

    // Check if every cell in every row contains a player marker.
    function isFull() {
        return tictactoe.every(row => row.every(cell => cell !== ''));
    }

    // Clear the backing data structure for the board.
    function clearBoard() {
        tictactoe = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    }

    // Render the gameboard by removing the cells on the DOM and re-adding them.
    function renderGameboard() {
        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
        addCells();
    }

    return { placeMarker, renderGameboard, findWinningCells, isFull, clearBoard };
})();

// Create a new instance of a player.
const playerFactory = (name, marker) => ({name, marker});

// Create a gameController module/singleton generated by an IIFE.
const gameController = (() => {
    const playerOne = playerFactory('Player 1', 'X');
    const playerTwo = playerFactory('Player 2', 'O');
    
    let player = playerOne;
    let winner;

    const playerOneButton = document.getElementById("player-one");
    const playerTwoButton = document.getElementById("player-two");
    const winnerStatement = document.getElementById('winner');

    playerOneButton.classList.toggle('current-player-style');

    // Cell ID by position.
    const tictactoeCellIds = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ]
    
    // Change the player's turn while highlighting current player.
    function changeTurn() {
        if (player === playerOne) {
            player = playerTwo;
            playerTwoButton.classList.toggle('current-player-style');
            playerOneButton.classList.toggle('current-player-style');
        } else {
            player = playerOne;
            playerOneButton.classList.toggle('current-player-style');
            playerTwoButton.classList.toggle('current-player-style');
        } 

        if (winner || gameboard.isFull()) {
            playerOneButton.classList.remove('current-player-style');
            playerTwoButton.classList.remove('current-player-style');
        }
    }

    // highlightWinningCells function takes in the 1D array for each winning cell position (e.g., [0,1]) 
    // then uses the position to look up the ID for the winning cell in the tictactoeCellIds 2D array.
    // We use the obtained cell ID to find the cell on the DOM and add the highlight css class
    // to the cell on the DOM. 
    function highlightWinningCell(position) {
        const cellId = tictactoeCellIds[position[0]][position[1]];
        const element = document.querySelector(`[data-id='${cellId}']`);
        element.classList.add('highlight');
    }

    // highlightWinningLine function takes in the line of winning cells (e.g., [[0,1], [0,2], [0,3]]),
    // loops through to get a 1D array (e.g., [0,1]) for each winning cell position,
    // then uses the 1D array as the parameter for highlightWinningCells function, which will highlight the 
    // cell on the DOM.
    function highlightWinningLine(positions) {
        for (let i = 0; i < positions.length; i++) {
            highlightWinningCell(positions[i]);
        }
    }

    // Declare the winner on the DOM.
    function declareWinner() {
        winnerStatement.textContent = `The winner is ${winner.name}!`
    }

    // Check whether winning cells exist. If they do, highlight the line of winning cells and declare the winner.
    function checkWin() {        
        const winningCells = gameboard.findWinningCells(player);

        if (winningCells) {
            winner = player;
            highlightWinningLine(winningCells);
            declareWinner(winner);
        }
    }

    // Attempt to make a play. If there is a winner, do not do anything more. Otherwise, place a marker in the array
    // and continue play.
    function makePlay(cell) {
        if (winner) {
            return null;
        }

        gameboard.placeMarker(cell.dataset.id, player.marker);

        // We're saving this because we're going to be changing turns and won't have access to this player
        // after we call changeTurn.
        const playedMarker = player.marker;
        
        checkWin();
        changeTurn();
        return playedMarker;
    }

    // Only allow gameboard cell that is empty cell to be clicked. If a play can be made, add a marker to the UI.
    const boardContainer = document.getElementById('gameboard');
    const handleClickableBox = e => {
        if (!e.target.classList.contains('box')) {
            return;
        }
        if (e.target.textContent !== '') {
            return;
        }
        const playedMarker = makePlay(e.target);

        if (playedMarker) {
            e.target.textContent = playedMarker;
        }
    }

    // Reset the gameboard by clearning the backing data structure and by resetting the DOM elements to 
    // their original states.
    function resetGameboard() {
        gameboard.clearBoard();
        gameboard.renderGameboard();
    }

    // Create a new game by resetting the gameboard on the DOM, setting player and winner back to the original states,
    // highlighting the current player, and removing the winning cell highlights.
    function newGame() {         
        resetGameboard();
        player = playerOne;
        winner = null;
        playerOneButton.classList.add('current-player-style');
        playerTwoButton.classList.remove('current-player-style');
        winnerStatement.textContent = '\u00A0';

        const highlightedCells = document.querySelectorAll('.highlight');
        highlightedCells.forEach(cell => {
            cell.classList.remove('highlight');
        }) 
    }

    resetGameboard();

    return { boardContainer, handleClickableBox, newGame };
    
})();


gameController.boardContainer.addEventListener('click', gameController.handleClickableBox);
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', gameController.newGame);