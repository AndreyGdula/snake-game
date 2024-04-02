const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30
const snake = [{x: 225, y: 225}]

const drawSnake = () => {
    ctx.fillStyle = "white"
    ctx.fillRect(snake(0).x, snake(0).y, size, size)
}