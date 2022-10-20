// CHECKERS GAME
let computerSquares = [
    '1B','1D','1F','1H',
    '2A','2C','2E','2G',
    '3B','3D','3F','3H',
];

let playerSquares = [
    '6A','6C','6E','6G',
    '7B','7D','7F','7H',
    '8A','8C','8E','8G',
];

let avaiableSquares = [
    '4A','4C','4E','4G',
    '5B','5D','5F','5H',
];

let clicked = true;
let lockedClick = false;
let firstSquare;
checkersBoard();
squareSizes();


/**
 * if window size gets changed than it will change the squares proportions aswell
 */
window.addEventListener("resize", event => {
    squareSizes();
})
// clicked && !lockedClick

window.addEventListener("keydown", function(e) {
    if (e.key == 'Escape') {
        clicked = true
        lockedClick = false

        let squares = document.querySelectorAll(".bSquare")
        for (const square of squares) {
            square.style.backgroundColor = "#aa793a";
        }
    }
})

/**
 * event that detects which square was clicked and gives information to function
 */
let squares = document.querySelectorAll('.bSquare')
for (const square of squares) {
    square.addEventListener("click", event => {
        movePieces(event.target.id, event.target.className);
    })
}

/**
 * function that creates the squares and rows of the checkers board game
 */
function checkersBoard() {
    let squares = ['wSquare', 'bSquare']
    let numbers = ['1','2','3','4','5','6','7','8']
    let letters = ['A','B','C','D','E','F','G','H']
    let pos = 0
    let html = ''

    for (let r=0; r<8; r++) {
        html += `
            <tr class="d-flex justify-content-center" id="rowSquare">
        `

        for (let c=0; c<8; c++) {
            if (c%2 == 0) {
                if (r%2 == 0) {
                    pos = 0
                } else {
                    pos = 1
                }
            } else {
                if (r%2 == 0) {
                    pos = 1
                } else {
                    pos = 0
                }
            }

            if (pos == 1) {
                if (r < 3) {
                    html += `
                        <td class="w12 ${squares[pos]}" id="${numbers[r]}${letters[c]}">
                            <img src="pieces/light.png" class="${numbers[r]}${letters[c]}" width="100%" id="img">
                        </td>
                    `   
                } else if (r >= 5) {
                    html += `
                        <td class="w12 ${squares[pos]}" id="${numbers[r]}${letters[c]}">
                            <img src="pieces/black.png" class="${numbers[r]}${letters[c]}" id="img" style="width: 100%;">
                        </td>
                    `   
                } else {
                    html += `
                        <td class="w12 ${squares[pos]}" id="${numbers[r]}${letters[c]}"></td>
                    ` 
                }     
            } else {
                html += `
                    <td class="w12 ${squares[pos]}" id="${numbers[r]}${letters[c]}"></td>
                ` 
            }

        }   

        html += `
            </tr>
        `
    }

    document.querySelector('#damaBoard').innerHTML += html
};


/**
 * defines height of squares to be the same as the width
 */
function squareSizes() {
    if (window.innerHeight > window.innerWidth) {
        // let wdSquare = document.querySelector('.w12').clientWidth
        // wdSquare += 'px'

        let perWidth = window.innerWidth * 0.1 + "px"

        for (const square of document.querySelectorAll('.w12')) {
            square.style.width = perWidth
        }

        let rows = document.querySelectorAll('#rowSquare')
        for (const row of rows) {
            row.style.height = perWidth
        }
    } else {
        let perHeight = window.innerHeight * 0.1 + "px"

        let rows = document.querySelectorAll('#rowSquare')
        for (const row of rows) {
            row.style.height = perHeight
        }
        
        for (const square of document.querySelectorAll('.w12')) {
            square.style.width = perHeight
        }
    }
}


/**
 * detects if there's a piece in the square clicked and averigues the player choose to move to another square
 * @param {*} id position/specific square clicked on
 * @param {*} iClass means that the id returned "img", which means there's a piece whitin the div. iClass is the the position of the square clicked on
 */
function movePieces(id, iClass) {
    let letters = ['A','B','C','D','E','F','G','H']
    let canEatFrom = []
    let line, letter, posLetter, pLine, pLetter

    for (const square of playerSquares) {
        line = parseInt(square.slice(0,1))
        letter = square.slice(1,2)
        posLetter = parseInt(letters.indexOf(letter))

        for (const pcPiece of computerSquares) {
            pLine = parseInt(pcPiece.slice(0,1))
            pLetter = pcPiece.slice(1,2)

            if ((pLine % 2 == 0 && pLetter != 'A') ||
                (pLine % 2 != 0 && pLetter != 'H')) {

                
                if ((line-1 == pLine) &&
                    (letters[posLetter+1] == pLetter) &&
                    (avaiableSquares.includes((pLine-1)+letters[posLetter+2]))) {

                    canEatFrom.push({
                        "fromSquare" : line+letter,
                        "eatSquare" : pLine+pLetter,
                        "toSquare" : (pLine-1) + letters[posLetter+2]
                    })
                    // console.log(canEatFrom);

                } else if ((line-1 == pLine) &&
                            (letters[posLetter-1] == pLetter) &&
                            (avaiableSquares.includes((pLine-1)+letters[posLetter-2]))) {

                    canEatFrom.push({
                        "fromSquare" : line+letter,
                        "eatSquare" : pLine+pLetter,
                        "toSquare" : (pLine-1) + letters[posLetter-2]
                    })
                }
            }

            // console.log(canEatFrom);
        }
    }

    if (clicked && !lockedClick) {
        if (id != "img") {
            clicked = false

            firstSquare = id
        } else {
            document.getElementById(iClass).style.backgroundColor = "#3b9742"

            firstSquare = iClass
        }
    } else if (!clicked && !lockedClick) {
        // console.log('oi'+canEatFrom);

        if (id == "img") {
            alert("You need to chose a free square to move your piece!")
            document.getElementById(firstSquare).style.backgroundColor = "#aa793a"
        } else if (canEatFrom.find(item => item.toSquare == id)) {
            document.getElementById(firstSquare).innerHTML = ''
            document.getElementById(firstSquare).style.backgroundColor = "#aa793a"
            document.getElementById(id).innerHTML += `
                <img src="pieces/black.png" class="${id}" id="img" style="width: 100%;"></img>
            `

            document.getElementById(canEatFrom[canEatFrom.findIndex(item => item.toSquare == id)].eatSquare).style.backgroundColor = "#aa3a3a"

            let pos = canEatFrom.findIndex(item => item.toSquare == id)
            playerSquares[playerSquares.indexOf(canEatFrom[pos].fromSquare)] = canEatFrom[pos].toSquare
            avaiableSquares[avaiableSquares.indexOf(canEatFrom[pos].toSquare)] = canEatFrom[pos].fromSquare
            avaiableSquares[avaiableSquares.push(canEatFrom[pos].eatSquare)]
            computerSquares = computerSquares.filter(item => item != canEatFrom[pos].eatSquare)

            setTimeout(eatenSquare, "500", canEatFrom,canEatFrom.findIndex(item => item.toSquare == id),false)

            console.log("");
            console.log("player's turn");
            console.log('player: '+playerSquares.sort());
            console.log('pc: '+computerSquares.sort());
            console.log('empty: '+avaiableSquares.sort());
            setTimeout(computersTurn, "500")
        } else {

            let line2 = parseInt(id.slice(0,1))
            let line1 = parseInt(firstSquare.slice(0,1))

            if (line1 - 1 == line2) {
                document.getElementById(id).innerHTML += `
                    <img src="pieces/black.png" class="${id}" id="img" style="width: 100%;"></img>
                `

                playerSquares[playerSquares.indexOf(firstSquare)] = id
                avaiableSquares[avaiableSquares.indexOf(id)] = firstSquare

                document.getElementById(firstSquare).innerHTML = ''
                document.getElementById(firstSquare).style.backgroundColor = "#aa793a"

                setTimeout(computersTurn, "500")
            } else {
                // alert("You can't go that far!")
                document.getElementById(id).style.backgroundColor = "#aa3a3a"

                setTimeout(defaultColors, "1000", id, firstSquare)
            }
        }
    }

    clicked = !clicked
}

/**
 * returns the colors of the squares clicked by the player back to their default board color 
 * @param {*} id transfers the second clicked square by the player
 * @param {*} firstSquare transfers the first clicked square by the player
 */
function defaultColors(id, firstSquare) {
    document.getElementById(firstSquare).style.backgroundColor = "#aa793a"
    document.getElementById(id).style.backgroundColor = "#aa793a"
}

/**
 * determines what plays the computer is gonna make
 */
function computersTurn() {
    lockedClick = true

    let letters = ['A','B','C','D','E','F','G','H']
    let fromSquares = []
    let canEatFrom = []
    let fromSquare2 = ''
    let possibilities = 0
    let line, pLine, pLetter, letter, fromSquare, lettersTo, lettersFrom, pos, posLetter


    for (const square of computerSquares) {
        line = parseInt(square.slice(0,1))
        letter = square.slice(1,2)
        posLetter = parseInt(letters.indexOf(letter))

        for (const playerPiece of playerSquares) {
            pLine = parseInt(playerPiece.slice(0,1))
            pLetter = playerPiece.slice(1,2)

            if ((pLine % 2 == 0 && pLetter != 'A') ||
                (pLine % 2 != 0 && pLetter != 'H')) {

                
                if ((line+1 == pLine) &&
                    (letters[posLetter+1] == pLetter) &&
                    (avaiableSquares.includes(pLine+1+letters[posLetter+2]))) {

                    canEatFrom.push({
                        "fromSquare" : line+letter,
                        "eatSquare" : pLine+pLetter,
                        "toSquare" : (pLine+1) + letters[posLetter+2]
                    })
                    // console.log(canEatFrom);

                } else if ((line+1 == pLine) &&
                            (letters[posLetter-1] == pLetter) &&
                            (avaiableSquares.includes(pLine+1+letters[posLetter-2]))) {

                    canEatFrom.push({
                        "fromSquare" : line+letter,
                        "eatSquare" : pLine+pLetter,
                        "toSquare" : (pLine+1) + letters[posLetter-2]
                    })
                }
            }
        }
    }    

    if (canEatFrom.length != 0) {

        pos = Math.floor(Math.random() * canEatFrom.length)

        document.getElementById(canEatFrom[pos].fromSquare).innerHTML = ''
        document.getElementById(canEatFrom[pos].toSquare).innerHTML += `
            <img src="pieces/light.png" class="4${canEatFrom[pos].toSquare}" id="img" style="width: 100%;"></img>
        `
        document.getElementById(canEatFrom[pos].eatSquare).style.backgroundColor = "#aa3a3a"

        setTimeout(eatenSquare, "500", canEatFrom,pos,true)

        computerSquares[computerSquares.indexOf(canEatFrom[pos].fromSquare)] = canEatFrom[pos].toSquare
        avaiableSquares[avaiableSquares.indexOf(canEatFrom[pos].toSquare)] = canEatFrom[pos].fromSquare

        // console.log(canEatFrom[pos].eatSquare);

        avaiableSquares[avaiableSquares.push(canEatFrom[pos].eatSquare)]
        playerSquares = playerSquares.filter(ind => ind != canEatFrom[pos].eatSquare)

    } else {

        possibilities = 0

        for (const square of avaiableSquares) {
            possibilities += 1

            line = parseInt(square.slice(0,1))
            letter = square.slice(1,2)

            if (line % 2 == 0) {
                lettersTo = ['A','C','E','G']
                lettersFrom = ['B','D','F','H']
            } else {
                lettersTo = ['B','D','F','H']
                lettersFrom = ['A','C','E','G']
            }

            pos = lettersTo.indexOf(letter)

            if (line % 2 == 0 && pos == 0) {
                fromSquare = (parseInt(line)-1) + lettersFrom[pos]
            } else if (line % 2 == 0 && pos != 0) {
                fromSquare = (parseInt(line)-1) + lettersFrom[pos]
                fromSquare2 = (parseInt(line)-1) + lettersFrom[pos-1]
            } else if (line % 2 != 0 && pos == lettersTo.length) {
                fromSquare = (parseInt(line)-1) + lettersFrom[pos]
            } else if (line % 2 != 0 && pos != lettersTo.length) {
                fromSquare = (parseInt(line)-1) + lettersFrom[pos]
                fromSquare2 = (parseInt(line)-1) + lettersFrom[pos+1]
            }

            if (computerSquares.includes(fromSquare) && !fromSquares.includes(fromSquare)) {
                fromSquares.push({"toSquare":square, "fromSquare":fromSquare})
            }

            if (computerSquares.includes(fromSquare2)
                && !fromSquares.includes(fromSquare2)
                && fromSquare2 != '') {
                fromSquares.push({"toSquare":square, "fromSquare":fromSquare2})
            }

            
            if (possibilities == avaiableSquares.length) {
                pos = Math.floor(Math.random() * fromSquares.length)

                document.getElementById(fromSquares[pos].fromSquare).innerHTML = ''
                document.getElementById(fromSquares[pos].toSquare).innerHTML += `
                    <img src="pieces/light.png" class="4${fromSquares[pos].toSquare}" id="img" style="width: 100%;"></img>
                `

                computerSquares[computerSquares.indexOf(fromSquares[pos].fromSquare)] = fromSquares[pos].toSquare
                avaiableSquares[avaiableSquares.indexOf(fromSquares[pos].toSquare)] = fromSquares[pos].fromSquare
            }
            // avaiableLines.includes(line) ? '' : avaiableLines.push(line)
        }
    }

    console.log("");
    console.log("pc's turn");
    console.log('player: '+playerSquares.sort());
    console.log('pc: '+computerSquares.sort());
    console.log('empty: '+avaiableSquares.sort());
    lockedClick = false
}

/**
 * function triggered by a delay-code of 1sec.
 * Makes the piece that has been eaten disappear of the board
 * @param {*} canEatFrom array that has the eaten possibilities
 * @param {*} pos random number within the length of canEatFrom 
 * @param {*} isPc returns true/false, depending if this function was triggered within the player's or pc's turn
 */
function eatenSquare(canEatFrom,pos,isPc) {
    if (isPc) {
        document.getElementById(canEatFrom[pos].eatSquare).innerHTML = ''
        document.getElementById(canEatFrom[pos].eatSquare).style.backgroundColor = "#aa793a"      
    } else {
        document.getElementById(canEatFrom[pos].eatSquare).innerHTML = ''
        document.getElementById(canEatFrom[pos].eatSquare).style.backgroundColor = "#aa793a"      
    }
}