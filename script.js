/* eslint-disable no-plusplus */

const gameboard = (function(){
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
        const text = document.createTextNode(input);
        cell.appendChild(text);
        cell.classList.add(`cell-${cellNumber}`);
        console.log(cell.classList);
    }
    
    for (let row = 0; row < tictactoe.length; row++) {
        for (let column = 0; column < tictactoe.length; column++) {
            const input = tictactoe[row][column]
            createCell(input);
            cellNumber++;
        }
    }
})();
