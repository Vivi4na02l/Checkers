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

let clicked = true; //play = false;
let firstSquare;
checkersBoard();
squareSizes();


/**
 * if window size gets changed than it will change the squares proportions aswell
 */
window.addEventListener("resize", event => {
    squareSizes();
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
 */
function movePieces(id, iClass) {

    if (clicked) {
        if (id != "img") {
            clicked = false

            firstSquare = id
        } else {
            document.getElementById(iClass).style.backgroundColor = "#3b9742"

            firstSquare = iClass
        }
    } else {
        if (id == "img") {
            alert("You need to chose a free square to move your piece!")
            document.getElementById(firstSquare).style.backgroundColor = "#aa793a"
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
                computersTurn();
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

    let letters = ['A','B','C','D','E','F','G','H']
    let fromSquares = []
    let fromSquare2 = ''
    let possibilities = 0
    let line, letter, fromSquare, lettersTo, lettersFrom


    // for (const square of computerSquares) {
    //     line = square.slice(0,1)
    //     letter = square.slice(1,2)
    //     posLetter = letters.indexOf(letter)

    //     for (const playerPiece of object) {
            
    //     }

    //     eatPieceLine = parseInt(line) + 1

    //     if (line % 2 == 0) {
    //         eatPieceLetter2 = letters[pos-1]    
    //     } else {
    //         eatPieceLetter = letters[pos+1]
    //     }
        
    // }    


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
                <img src="pieces/light.png" class="4${moveTo}" id="img" style="width: 100%;"></img>
            `

            computerSquares[computerSquares.indexOf(fromSquares[pos].fromSquare)] = fromSquares[pos].toSquare
            avaiableSquares[avaiableSquares.indexOf(fromSquares[pos].toSquare)] = fromSquares[pos].fromSquare
        }
        // avaiableLines.includes(line) ? '' : avaiableLines.push(line)
    }
}