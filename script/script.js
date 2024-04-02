const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
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

const food = [{
    x: randomPosition(), 
    y: randomPosition(),
    color: "red"
}]

let direction, loopId

const drawSnake = () => {
    ctx.fillStyle = "white"
    
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "lightgray"
        }

        ctx.fillRect(position.x, position.y, size, size)
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
    ctx.fillRect(food.x, food.y, size, size)
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

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()

    loopId = setInterval(() => {
        gameLoop()
    }, 300)
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

gameLoop()