const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const h1 = document.querySelector("h1")
const menuGameover = document.querySelector("div.menu-gameover")
const finalScore = document.querySelector("p.final-score")
const buttonStart = document.querySelector("button.btn-start")
const record = document.querySelector("p.record")
const buttonUp = document.querySelector("button#up")
const buttonLeft = document.querySelector("button#left")
const buttonRight = document.querySelector("button#right") 
const buttonDown = document.querySelector("button#down")
const control = document.querySelector("div.control")

const speedGame = 150
const size = 30
const sound = new Audio("../files/score.mp3")
const bestScore = []

let snake = [
    {x: 300, y: 300},
    {x: 330, y: 300}
]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const food = {
    x: randomPosition(), 
    y: randomPosition(),
    color: "red"
}

let direction, loopId

const drawSnake = () => {
    ctx.fillStyle = "white"
    ctx.shadowColor = "white"
    
    snake.forEach((position, index) => {
        ctx.shadowBlur = 8
        if (index == snake.length - 1) {
            ctx.fillStyle = "lightgray"
        }

        ctx.fillRect(position.x, position.y, size, size)
        ctx.shadowBlur = 0
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    } if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    } if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    } if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }

    snake.shift()
}

const drawFood = () => {
    ctx.fillStyle = food.color
    ctx.shadowColor = food.color
    ctx.shadowBlur = 15
    ctx.fillRect(food.x, food.y, size, size)
}

const eatFood = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        sound.play()

        food.x = randomPosition()
        food.y = randomPosition()

        h1.innerHTML = `SCORE: ${snake.length - 2}`

        while (snake.find((position) => position.x == food.x && position.y == food.y)) {
            food.x = randomPosition()
            food.y = randomPosition()
        }
    }
}

const collision = () => {
    const head = snake[snake.length - 1]
    const neckIndex = snake.length - 2

    const wallCollision = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.width

    const snakeCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || snakeCollision) {
        gameover()
    }
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#101010"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const gameover = () => {
    direction = undefined
    canvas.style.filter = "blur(5px)"
    control.style.filter = "blur(5px)"
    menuGameover.style.display = "flex"
    finalScore.innerHTML = `SCORE: ${snake.length - 2}`
    bestScore.push(snake.length - 2)
    record.innerHTML = `BEST SCORE: ${Math.max(...bestScore)}`
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    eatFood()
    collision()
    mobileControl()

    loopId = setInterval(() => {
        gameLoop()
    }, speedGame)
}

document.addEventListener('keydown', ({key}) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    } if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    } if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    } if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})

buttonStart.addEventListener('click', () => {
    menuGameover.style.display = "none"
    canvas.style.filter = "blur(0px)"
    control.style.filter = "blur(0px)"
    h1.innerHTML = `SCORE: 0`
    snake = [
        {x: 300, y: 300},
        {x: 330, y: 300}
    ]
})

const mobileControl = () => {
    if (window.innerWidth > 600) {
        control.style.display = "none"
    }

    buttonUp.addEventListener('click', () => {
        if (direction != "down") {
            direction = "up"
        }
    })

    buttonLeft.addEventListener('click', () => {
        if (direction != "right") {
            direction = "left"
        }
    })

    buttonRight.addEventListener('click', () => {
        if (direction != "left") {
            direction = "right"
        }
    })

    buttonDown.addEventListener('click', () => {
        if (direction != "up") {
            direction = "down"
        }
    })}

gameLoop()