export default class Square {
  constructor(x, y, color, squareSize, spaceSize, offsetY) {
    this.x = x
    this.y = y
    this.color = color
    this.squareSize = squareSize
    this.spaceSize = spaceSize
    this.offsetY = offsetY
  }

  render(ctx) {
    ctx.beginPath()
    ctx.rect(this.x * (this.squareSize + this.spaceSize), 
      this.y * (this.squareSize + this.spaceSize) + this.offsetY, 
      this.squareSize, this.squareSize)
    ctx.fillStyle = this.color
    ctx.fill() 
    ctx.closePath()
  }
}