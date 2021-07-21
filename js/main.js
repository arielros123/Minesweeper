'use strict'

var FLOOR = 'FLOOR';
var mine = 'mine';
var gClickCount = 0;
var gSize;


var gBoard = [
    {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
    }
];

    var gLevels = [
        { idx: 0, SIZE: 4, MINES: 2 },
        { idx: 1, SIZE: 8, MINES: 12 },
        { idx: 2, SIZE: 12, MINES: 30 },
    ];

var gGame =
{
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}




function initGame() {
    gClickCount = 0;
    gBoard = []
    activateTimer()
}

var board = buildBoard();

renderBoard(board)

console.table(board);


// function buildBoard() {
//     var board = [];
//     for (var i = 0; i < gSelectedLevel.SIZE; i++) {
//         board[i] = [];
//         for (var j = 0; j < gSelectedLevel.SIZE; j++) {
//             board[i][j] = {
//                 minesAroundCount: 0,
//                 isShown: false,
//                 isMine: false,
//                 isMarked: false,
//                 isHinted: false
//             }

//         }
//     }
//     return board;
// }

function buildBoard() {
    var board = createMat(12, 12)
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                id: count++,
                isShown: true,
                isMine: false,
                isMarked: true,
                type: 'FLOOR'
            };

            board[i][j] = cell;
        }
    }
    board[2][1].type = 'mine';
    board[2][2].type = 'mine';

    console.log(board);
    return board;
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            cellClass += (currCell.type === FLOOR) ? ' floor' : ' mine';
            strHTML += `\t<td class="cell ${cellClass}" >\n`;
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



// function getSelector() {
//     return 'cell-' + coord.i + '-' + coord.j
// }
// function renderCell(i, j, value) {
//     var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
//     elCell.innerText = value;
// }

// var a = getClassName("cell cell-0-3 floor");
// console.log(a)
// var b = getClassName2(a);
// console.log(b);

var board2 = [];
a = getClassName(board)
console.log(a);


// function getClassName2() {
//     var wordArray = [];
//     var words = a[1];
//     wordArray = words.split('-');
//     return wordArray
// }

function getClassName(board) {
    var wordArray = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var words = board[i][j];
            wordArray += words.split(' ');
        }
        return wordArray
    }

    // function getClassName3() {
    //     var wordArray = [];
    //     var words = b;
    //     wordArray = words.split(' ');
    //     return wordArray
    // }

    // console.log(setMinesNegsCount(board))


    // function setMinesNegsCount(cellI, cellJ, mat) {
    //     for (var i = cellI - 1; i <= cellI + 1; i++) {
    //         if (i < 0 || i >= mat.length) continue;
    //         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
    //             if (i === cellI && j === cellJ) continue;
    //             if (j < 0 || j >= mat[i].length) continue;
    //             var currCell = mat[i][j]
    //             if (currCell === FLOOR ) neighborsCount++;
    //         }
    //     }
    //     return neighborsCount;
    // }

    function startTime() {
        gTime++;
        var elTime = document.querySelector('h2 span.time');
        elTime.innerText = gTime;
    }


    function cellClicked(elCell, i, j) {

    }

    function cellMarked(elCell) {


    }

    function checkGameOver() {

    }

    function expandShown(board, elCell, i, j) {

    }
}

// function renderCell(location, value) {
    //     var cellSelector = '.' + getClassName(location)
    //     var elCell = document.querySelector(cellSelector);
    //     elCell.innerHTML = value;
    // }

    // var middleI = Math.floor(board[0].length / 2);
    // var middleJ = Math.floor(board.length / 2);
    // if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
        // 	cell.type = WALL;
        // }
        // if (i === 0 && j === middleI ||
        // 	i === board.length - 1 && j === middleI ||
        // 	i === middleJ && j === board[0].length - 1 ||
        // 	i === middleJ && j === 0) {
            // 	cell.type = FLOOR
            // };
            // function setMinesNegsCount(board) {
            //     var i = parseInt(elCell.dataset.id.split('-')[1]);
            //     var j = parseInt(elCell.dataset.id.split('-')[2]);

            //     for (var i = pos.i - 1; i <= pos.i + 1; i++) {
            //         if (i < 0 || i >= board.length) continue
            //         for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            //             if (j < 0 || j >= board[0].length) continue
            //             if (i === pos.i && j === pos.j) continue

            //             var cell = board[i][j]
            //             if (cell === mine) count++
            //         }
            //     }
            //     return count
            // }