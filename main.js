const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

function random (min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return num
}

function randomRGB () {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}

function CaraFeliz (x, y, velX, velY, color, size) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.size = size
}

CaraFeliz.prototype.draw = function () {
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
  ctx.fillStyle = this.color
  ctx.fill()

  // Dibujar los ojos
  ctx.beginPath()
  ctx.arc(this.x - this.size / 2, this.y - this.size / 4, this.size / 6, 0, Math.PI * 2, false)
  ctx.fillStyle = 'black'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(this.x + this.size / 2, this.y - this.size / 4, this.size / 6, 0, Math.PI * 2, false)
  ctx.fillStyle = 'black'
  ctx.fill()

  // Dibujar la sonrisa
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI, false)
  ctx.lineWidth = this.size / 10
  ctx.strokeStyle = 'black'
  ctx.stroke()
}

CaraFeliz.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX)
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY)
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY)
  }

  this.x += this.velX
  this.y += this.velY
}

const CarasFelices = []

function loop () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)

  while (CarasFelices.length < 25) {
    const size = random(30, 60)
    const happyFace = new CaraFeliz(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-3, 3),
      random(-3, 3),
      randomRGB(),
      size
    )
    CarasFelices.push(happyFace)
  }

  for (let i = 0; i < CarasFelices.length; i++) {
    CarasFelices[i].draw()
    CarasFelices[i].update()
  }

  requestAnimationFrame(loop)
}

loop()
