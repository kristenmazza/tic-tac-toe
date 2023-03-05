/* eslint-disable no-plusplus */

const gameboard = (() => {
    let cellNumber = 1;

    const tictactoe = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    
    function createCell(input) {
        const board = document.getElementById('gameboard');
        const cell = document.createElement('div');
        cell.classList.add('box');
        board.appendChild(cell);
        cell.textContent = input;
        cell.setAttribute('data-id', `${cellNumber}`);
    }
    
    for (let row = 0; row < tictactoe.length; row++) {
        for (let column = 0; column < tictactoe.length; column++) {
            const input = tictactoe[row][column]
            createCell(input);
            cellNumber++;
        }
    }

    return { tictactoe };

})();

const playerFactory = (name, marker) => ({name, marker});

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

const cells = document.querySelectorAll('.box');
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const text = cell.textContent;
        let cellId;
        if (text === '') {
            console.log(e.target.dataset.id);
            cellId = e.target.dataset.id;
        }
        gameController.addMarker(cellId);
    });
});

gameController = (() => {

    function addMarker(cellId) {
        if (cellId === '1') {
            gameboard.tictactoe[0][0] = 'X'; 
            console.log(gameboard.tictactoe);
        }    
    }

    return { addMarker };
})();