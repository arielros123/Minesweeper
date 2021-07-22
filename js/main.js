'use strict'

const MINE = '💥'
const FLAG = '🚩'
var gClickCount = 0;
var gBoard = []
var gSize = 4;
var gNumMine = 4;
var gClickCount = 0;
var gFlagCount = 0;
var gHappy = '🙂';
var gSad = '☹️';
var gTimerOn = Date.now();
var gMyTime;
var gFirstClick = true;

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
    gClickCount = 0,
        gLevels = 0;
    renderBoard(board);
    setMinesNegsCount(board);
    stopTimer();
    SetMines(board);

}
var board = buildBoard();


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevels[0].SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevels[0].SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isFlag: false,
                isMarked: false,
                location: { i, j }, 

            }
        }
    }
    // board[1][1] = {isMine: true} ;
    // board[3][1] = {isMine: true} ;
    // console.log(board) ;
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board.length; j++) {
            var cellClass = `cell-${i}-${j}`
            strHTML += `\t<td class="cell ${cellClass}" onclick="cellClicked(this)" oncontextmenu="setFlag(this)">\n`;
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            currCell.minesAroundCount = getNegsCount(i, j, board)
            renderCell({ i, j }, currCell.minesAroundCount)
        }
    }
}


function getNegsCount(cellI, cellJ, board) {
    var minesCount = 0 ;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if ((board[i][j].isMine))
            minesCount++ ;
            ;
        }
    }
    return minesCount;
}




function cellClicked(cellI, cellJ, board) {
    if (!gGame.isOn) return;
    if (gFirstClick) {
        startTimer()
        gBoard[i][j].isShown = true;
        gFirstClick = false;
        gGame.shownCount++;
        setMinesNegsCount(board)
    }
    
    var currCell = gBoard[i][j]
    if (currCell.isMine && !currCell.isShown) {
        isALoss(cellI, cellJ)
    }
    
    if (gGame.markedCount === gLevel.MINES) {
        isAVictory(cellI, cellJ)
    }
    
    if (!currCell.isShown) {
        gGame.shownCount++;
        currCell.isShown = true;
        if (+(currCell.minesAroundCount) === 0 && !currCell.isMine && !currCell.isFlag) {
            expandShown(cellI, cellJ, gBoard)
            return;
        }
        renderBoard(board)
    }
}


function startTime() {
    gTime++;
    var elTime = document.querySelector('h2 span.time');
    elTime.innerText = gTime;
}

function SetMines(board) {
    var board = [] ;
    var numOfMine = 0
    while (numOfMine < gNumMine) {
        var randomI = getRandomInteger(0, board.length)
        var randomJ = getRandomInteger(0, board.length)
        if (!board[randomI][randomJ].isMine && !board[randomI][randomJ].isShown) {
            board[randomI][randomJ].isMine = true
            numOfMine++
        }
    }
}

function SetMines() {
    var emptyCells = [];
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            if (board[i][j] === board[i][j]) {
                var emptyCell = { i, j };
                emptyCells.push(emptyCell);
            }
        }
    }
    console.log(emptyCells) ;
    var randomCell = emptyCells[getRandomInt(0, emptyCells.length)];
    if (!randomCell) return null; 
    randomCell = MINE ;
    return randomCell;
}


function cellMarked(elCell) {

    
}


function expandShown(board, elCell, i, j) {
    
}

function boardSize(elSize) {
    
    gSize = elSize;
    if (elSize === 4) gNumMine = 2
    if (elSize === 8) gNumMine = 12
    if (elSize === 12) gNumMine = 30
    
    init()
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                document.querySelector('.cell-' + i + '-' + j).innerText = gMine
            }
        }
    }
    setTimeout(timer())
    console.log(timeCount)
}



        // function getNegsNegs(cellI, cellJ, mat) {
            //     var negs = setMinesNegsCount(cellI, cellJ, board);
            //     var negsNegsArray = [];
            //     for (var i = 0; i < negs.length; i++) {
        //         var negsNegs = setMinesNegsCount(negs[i].i, negs[i].j, mat);
        //         var temp = { a: 0, b: 0, c: [] };
        //         temp.a = negs[i].i;
        //         temp.b = negs[i].j;
        //         temp.c = negsNegs;
        //         negsNegsArray.push(temp);
        
        //     }
        //     return negsNegsArray;
        
        // }
        
        // var neg = getNegsNegs(5, 5, board);
        
        // for (var i = 0; i < neg.length; i++) {
//     console.log('for cell : ' + neg[i].a + ' ' + neg[i].b + ' , the negs are :');
//     for (var j = 0; j < neg[i].c.length; j++) {
    //         console.log(neg[i].c[j].i + ' ' + neg[i].c[j].j);
    //     }
    // }
    
    // function getBombsNumberPerCell(cellI, cellJ, mat) {
        //     var negsWithBombsArray = [];
//     var negs = getNegsNegs(cellI, cellJ, mat);
//     for (var i = 0; i < negs.length; i++) {
//         //console.log('for cell : ' + neg[i].a + ' ' + neg[i].b + ' , the negs are :');
//         //for (var j = 0; j < neg[i].c.length; j++) {
    //         var bombsPerNeg = getNumOfBombs(negs[i].c, bombs);
    //         var negsWithBombs = { x: negs[i].a, y: negs[i].b, numOfBombs: bombsPerNeg }
    //         negsWithBombsArray.push(negsWithBombs)
    //         //console.log(neg[i].c[j].i + ' ' + neg[i].c[j].j);
    //     }
    //     return negsWithBombsArray;
    // }
    
    // function getNumOfBombs(negs, allBombs) {
        //     var counter = 0;
        //     for (var k = 0; k < negs.length; k++) {
            //         console.log(`neg: ${negs[k].i}, ${negs[k].j}`);
//         for (var l = 0; l < allBombs.length; l++) {
//             console.log(`bomb: ${allBombs[l].bombX}, ${allBombs[l].bombY}`)
//             if (negs[k].i === allBombs[l].bombX && negs[k].j === allBombs[l].bombY) {
    //                 counter++;
//             }
//         }
//     }
//     return counter;
// }

// var cellToBombs = getBombsNumberPerCell(5, 5, board);
// for (var k = 0; k < cellToBombs.length; k++) {
    //     console.log(`for neg x:${cellToBombs[k].x}, y:${cellToBombs[k].y}, num of bombs:${cellToBombs[k].numOfBombs}`);
// }


// var board2 = [];
// a = getClassName(board)
// console.log(a);


// function getClassName(board) {
    //     var wordArray = [];
    //     for (var i = 0; i < board.length; i++) {
        //         for (var j = 0; j < board[0].length; j++) {
            //             var words = board[i][j];
//             wordArray += words.split(' ');
//         }
//         return wordArray
//     }
// }

// function getNegsCount(cellI, cellJ, board) {
//     var minesCount = 0;
//     if (cellI > 0 && cellI < board.length && cellJ > 0 && cellJ < board.length) {
//         for (var i = cellI - 1; i < cellI + 1; i++) {
//             for (var j = cellJ - 1; j < cellJ + 1; j++) {
//                 minesCount++

//             }
//         }
//     }
//     return minesCount;
// }
// function getNegsCount(cellI, cellJ,board ) {
//     var minesCount = 0;
//         for (var i = cellI - 1; i <= cellI + 1 && i<8 ; i++) {
//             if (i < 0) continue;
//             for (var j = cellJ - 1; j <= cellJ + 1 && j<8 ; j++) {
//                 if (j<0 || (i===cellI && j === cellJ)) continue ;
//                 minesCount++

//             }
//         }
//     }
//     return minesCount;
// }

// function getAllNegs(pos) {
//     var negs = [];
//     for (var i = pos.i - 1; i <= pos.i + 1 && i < 8; i++) {
//         if (i < 0) continue;
//         for (var j = pos.j - 1; j <= pos.j + 1 && j < 8; j++) {
//             if (j < 0 || (i === pos.i && j === pos.j)) continue;
//             negs.push({ i, j });
//         }
//     }

//     return negs;
// }
