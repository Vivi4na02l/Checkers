// CHECKERS GAME
let clicked = true;
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
let squares = document.querySelectorAll('.w12')
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

        // alert("aqui");
    } else {
        let perHeight = window.innerHeight * 0.1 + "px"

        let rows = document.querySelectorAll('#rowSquare')
        for (const row of rows) {
            row.style.height = perHeight
        }
        
        for (const square of document.querySelectorAll('.w12')) {
            square.style.width = perHeight
        }

        // alert("ali");
    }
}


/**
 * detects if there's a piece in the square clicked and averigues the player choose to move to another square
 * @param {*} id position/specific square clicked on
 */
function movePieces(id, iClass) {
    // console.log(id)

    id = '#'+id

    if (clicked) {
        if (id != "#img") {
            alert(id)
        } else {
            alert(iClass)
        }
    }

    clicked = !clicked
}