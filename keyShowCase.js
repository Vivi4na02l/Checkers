let divShowCase = document.querySelector('#divShowCase')
showCase()

window.addEventListener("resize", function() {showCase()} )

function showCase() {
    divShowCase.style.position = 'absolute'
    divShowCase.style.zIndex = '1'
    divShowCase.style.width = window.innerWidth + 'px'
    divShowCase.style.height = window.innerHeight + 'px'
}

let delay = 5000, loop = 0, opacity = 1

divShowCase.addEventListener('click', function(){
    delay = 10

    setTimeout(function() {
        decreaseOpacity()
    }, delay)
})

setTimeout(function() {
    decreaseOpacity()
}, delay)

function decreaseOpacity() {
    
    loop += 1
 
    setTimeout(function() {
        decreaseOpacity2(loop)
    }, 30)
}

function decreaseOpacity2(loop) {
    opacity -= loop/100
    
    if (loop % 2 == 0)
        divShowCase.style.opacity = opacity

    if (loop != 50)
        decreaseOpacity()

    if (loop >= 50)
        divShowCase.style.visibility = 'hidden'
}