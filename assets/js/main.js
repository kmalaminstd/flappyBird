document.addEventListener('DOMContentLoaded', () => {
    // selectors
    const mainElm = document.querySelector('main')
    const skyElm = document.querySelector('.sky')
    const birdElm = document.querySelector('.bird')
    const groundElm = document.querySelector('.ground')
    const tryBtnElm = document.querySelector('#tryAgain')
    const gameOvTxtElm = document.querySelector('.tryBox p')


    let birdBottom = 350;
    let birdLeft = 210
    let isGameOver = false
    let gap = 380
    let score = 0

    tryBtnElm.addEventListener('click', () => {
        window.location.reload()
    })

    function startGame () {
        birdBottom -= 2
        birdElm.style.bottom = birdBottom + 'px'
        birdElm.style.left = birdLeft + 'px'
    }

    let startGameTimer = setInterval(startGame, 20)

    function jumpBird(){
        if(birdBottom < 550) birdBottom += 50
        birdElm.style.bottom = `${birdBottom}px`
        console.log(birdBottom);
    }
    
    function controlJump(e){
        // console.log(e.type);
        if(e.key == ' ' || e.type === 'touchstart'){
            jumpBird()
        }
    }

    document.addEventListener('keyup', controlJump)
    document.addEventListener('touchstart', controlJump)

    function pipeCreate(){
        let pipeLeft = 460
        let randomHight = Math.floor(Math.random() * 60)
        let pipeBottom = randomHight
        let pipe = document.createElement('div')

        let topPipe = document.createElement('div')
        topPipe.classList.add('topPipe')

        pipe.classList.add('pipe')

        mainElm.appendChild(pipe)
        mainElm.appendChild(topPipe)

        pipe.style.left = pipeLeft + 'px'
        pipe.style.bottom = pipeBottom + 'px'

        topPipe.style.left = pipeLeft + 'px'
        topPipe.style.bottom = pipeBottom + gap + 'px'

        function movePipe(){
            pipeLeft -= 2
            pipe.style.left = pipeLeft + 'px'
            topPipe.style.left = pipeLeft + 'px'

            if(pipeLeft == -60){
                clearInterval(pipeTimer)
                mainElm.removeChild(pipe)
                mainElm.removeChild(topPipe)
            }
            if( pipeLeft > 190 && pipeLeft < 260 && birdLeft === 210 && (birdBottom < pipeBottom + 250 || birdBottom > pipeBottom + gap -50 ) || birdBottom < 200){
                gameOver()
                clearInterval(pipeTimer)
                clearTimeout(pipeCreateTimer)
                console.log('Game Over');
                console.log(`birbottom ${birdBottom}`);
            }
        }

        let pipeTimer = setInterval(movePipe, 20)
        let pipeCreateTimer = setTimeout(pipeCreate, 3000);
        
    }

    pipeCreate()

    function gameOver(){
        clearInterval(startGameTimer)
        clearInterval(scoreTimer)
        isGameOver = true
        document.removeEventListener('keyup', controlJump)
        gameOvTxtElm.textContent = 'Game Over'
        document.querySelector('.tryBox').style.display = 'block'
    }

    function scoreCount(){
        score++
        document.querySelector('#gameScore').textContent = score
    }

    let scoreTimer = setInterval(scoreCount, 100)

})

