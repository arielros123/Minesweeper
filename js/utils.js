function getNumsAverage(nums) {
    return getSum(nums) / nums.length
}

function getSum(nums) {
    var sum = 0;
    for (var i = 0; i < nums.length; i++) {
        sum += nums[i]
    }
    return sum
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//get a Matrix wite random values
function getMat(colIdx, rowIdx) {
    var board = [];
    for (var i = 0; i < rowIdx; i++) {
        board[i] = []
        for (var j = 0; j < colIdx; j++) {
            board[i][j] = getRandomInt(1, 25);
        }
    }

    return board;
}

function getRandomColor() {
    var color = '#';
    var hexCodes = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
        var randIdx = getRandomIntInt(0, 16);
        color += hexCodes.charAt(randIdx);
    }
    return color;
}

//render mat
function renderMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// render cell location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


// get empty cell
function getEmptyCell() {
    var emptyCells = getEmptyCells();
    var idx = getRandomIntInclusive(0, emptyCells.length - 1);
    var emptyCell = emptyCells[idx];
    return emptyCell;
}


// get empty cells
function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j]) continue;
            emptyCells.push({ i, j });
        }
    }
    return emptyCells;
}

// random number inclusive max
function getRandomIntegerInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// random number NOT inclusive max
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// copy mat
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        // newMat[i] = mat[i].slice();
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

// Neighbors loop
function getAllNegs(pos) {
    var negs = [];

    for (var i = pos.i - 1; i <= pos.i + 1 && i < 8; i++) {
        if (i < 0) continue;
        for (var j = pos.j - 1; j <= pos.j + 1 && j < 8; j++) {
            if (j < 0 || (i === pos.i && j === pos.j)) continue;
            negs.push({ i, j });
        }
    }

    return negs;
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function blowUpNegs(cellI, cellJ, board) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j] === LIFE) {
                board[i][j] = ''
                renderCell({ i, j }, '')
            }
        }
    }
}

function activateTimer() {
    var currTime = Date.now()
    var diff = new Date(currTime - gTimer);
    var min = diff.getMinutes();
    var sec = diff.getSeconds();
    // var milisec = diff.getMilliseconds() / 100;
    var elDiv = document.querySelector('.timer');
    min = min < 10 ? `0${min}` : min
    sec = sec < 10 ? `0${sec}` : sec
    var strHTML = min + ':' + sec;
    elDiv.innerHTML = strHTML;
}

function renderMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            if (i === 0 && j) {
                strHTML += '<td  class=" ' + className + ' wall-top"> ' + cell + ' </td>'

            } else if (i === mat.length - 1) {
                strHTML += '<td  class=" ' + className + ' wall-bottom"> ' + cell + ' </td>'

            } else if (j === 0) {
                strHTML += '<td  class=" ' + className + ' wall-left"> ' + cell + ' </td>'

            } else if (j === mat[0].length - 1) {
                strHTML += '<td  class=" ' + className + ' wall-right"> ' + cell + ' </td>'

            } else {
                strHTML += '<td class="' + className + '"> ' + cell + ' </td>'

            }
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}