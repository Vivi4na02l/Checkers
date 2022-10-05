// CHECKERS GAME
let clicked = true;
let firstSquare;
let play = 0;
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
        } else {
            let line2 = parseInt(id.slice(0,1))
            let line1 = parseInt(firstSquare.slice(0,1))

            if (line1 - 1 == line2) {
                document.getElementById(id).innerHTML += `
                    <img src="pieces/black.png" class="${id}" id="img" style="width: 100%;"></img>
                `

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

function defaultColors(id, firstSquare) {
    document.getElementById(firstSquare).style.backgroundColor = "#aa793a"
    document.getElementById(id).style.backgroundColor = "#aa793a"
}

function computersTurn() {
    let line, lettersFrom, lettersTo, moveFrom, moveTo
    play += 1

    if (play == 1) {
        line = 3
    }

    if (line % 2 != 0) {
        lettersFrom = ['B','D','F','H']
        lettersTo = ['A','C','E','G']
    } else {
        lettersFrom = ['A','C','E','G']
        lettersTo = ['B','D','F','H']
    }

    pos = Math.floor(Math.random() * 4)
    
    if (play == 1) {

        moveTo = lettersTo[pos]
        
        if (line % 2 == 0 && pos == 0) {
            moveFrom = lettersFrom[pos]
        } else if (line % 2 != 0 && pos == 3) {
            moveFrom = lettersFrom[pos-1]
        } else {
            noneOrPlus = [0,1]

            moveFrom = lettersFrom[pos+noneOrPlus[Math.floor(Math.random())]]
        }

        alert(moveFrom+','+moveTo)

        document.getElementById('3'+moveFrom).innerHTML = ''
        document.getElementById('4'+moveTo).innerHTML += `
            <img src="pieces/light.png" class="4${moveTo}" id="img" style="width: 100%;"></img>
        `
    }

}