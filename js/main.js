'use strict'

const MINE = '💥'
const FLAG = '🚩'
const EMPTY = ''
var gCurrlevel;
var gBoard;
var gGame;
var gFlagCount = 0;
var gFirstClick = true;
var gLevels = createLevels()
var gTime1 = Date.now();
var gMyTime;

// this function starts the game and do the first things for it 
function initGame() {
    renderLevels()
    gGame = {
        isOn: true,
        isFirstClick: true,

    }
    gBoard = buildBoard();
    renderBoard(gBoard);
    startTimer()

}

// this function render the level of game into the board

function renderLevels() {
    var elLevel = document.querySelector('.level-buttons');
    var strHTML = '';
    for (var levelId in gLevels) {
        strHTML += `<button onclick="selectLevel(${levelId})" class="level">${gLevels[levelId].levelName}</button>`
    }
    elLevel.innerHTML = strHTML;
}


// this function insert the values of each level according to the rirht parameters
 
function createLevels() {
    var easyLevel = createLevel('easy', 2, 4);
    var mediumLevel = createLevel('medium', 12, 8);
    var hardLevel = createLevel('hard', 30, 12);
    return [easyLevel, mediumLevel, hardLevel]
}

// this function take the parameters for the leval of the game

function createLevel(levelName, mines, size) {
    return {
        levelName,
        mines,
        size
    }
}

// function that help choose the level on the start of the game

function selectLevel(id) {
    gCurrlevel = gLevels[id];
    initGame();
}

// function of the model of the board

function buildBoard() {
    var board = [];
    for (var i = 0; i < gCurrlevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gCurrlevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isFlag: false,
                isMarked: false,
                type: EMPTY,
                location: { i, j }

            }
            board[i][j] = cell;
        }
    }

    return board;
}

// function of the DOM board

function renderBoard(board) {
    var elBoard = document.querySelector('.board-container')
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board.length; j++) {
            // var currCell = board[i][j];
            var cellClass = ` cell-${i}-${j}`
            strHTML += `\t<td class="cell ${cellClass}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="setFlag(this)"></td>`;
        }
        strHTML += '</tr>\n';
    }
    strHTML += '</table>'
    elBoard.innerHTML = strHTML;
}

// function about clicking on cell

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gGame.isFirstClick) {
        gGame.isOn = true;
        setMinesRand(gBoard, { i, j })
        setMinesNegsCount(gBoard)
        gGame.isFirstClick = false
    }
    if (gBoard[i][j].isShown) return;

    gBoard[i][j].isShown = true;
    elCell.innerText = gBoard[i][j].type;
}

//  this fiunction add mines randomaly 

function setMinesRand(board, minesPos) {
    gGame.mines = [];
    var numOfMines = 0;
    while (numOfMines !== gCurrlevel.mines) {
        var i = getRandomIntegerInclusive(0, board.length - 1)
        var j = getRandomIntegerInclusive(0, board.length - 1)
        if (i === minesPos.i && j === minesPos.j) continue;
        if (board[i][j].type === EMPTY) {
            addMine(board, i, j);
            numOfMines++
        }
    }

}

// this function add one mine to the board

function addMine(board, i, j) {
    var cell = {
        type: MINE,
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false,
        isCanClick: true
    }
    board[i][j] = cell;
    gGame.mines.push({ i, j });
}

function getRandomIntegerInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// this function count mines on board

function countMines(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkcell(board, { i: i, j: j })) continue;
            if (i === pos.i && j === pos.j) continue;
            if (board[i][j].isMine === true) count++;
        }
    }
    return count;
}

// this function check the number of mines neg cell

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            TypeCell(board, { i, j });
        }
    }
}

//  this function check the type fo

function TypeCell(board, pos) {
    var count = countMines(board, pos);
    gBoard[pos.i][pos.j].minesAroundCount = count;
    if (gBoard[pos.i][pos.j].type === EMPTY && gBoard[pos.i][pos.j].minesAroundCount !== 0) {
        gBoard[pos.i][pos.j].type = gBoard[pos.i][pos.j].minesAroundCount;
    }
}
// this function checl if the cell is in the board limits

function checkcell(board, pos) {
    return (pos.i >= 0 && pos.i < board.length &&
        pos.j >= 0 && pos.j < board.length);
}

// this function check if the game is over

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[pos.i][pos.j].type === MINE ) {
                document.querySelector('.cell-' + i + '-' + j).innerText = gMine
            }
            stopTimer()
            initGame()
        }
    }
}

//  this function start the timer

function startTimer() {
    var gTime1 = Date.now();
    var gMyTime = setInterval(timeCycle, 1);
}

// this function calculate the timer

function timeCycle() {
    var time2 = Date.now();
    var msTimeDiff = time2 - gTime1;
    var timeDiffStr = new Date(msTimeDiff).toISOString().slice(17, -1);
    document.querySelector('.timer').innerHTML = timeDiffStr;
}

// this function stop the timer

function stopTimer() {
    clearInterval(gMyTime);
    //document.querySelector('.stop').innerText;
}