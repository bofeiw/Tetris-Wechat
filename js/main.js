import Square from './res/square'

let ctx = canvas.getContext('2d')
const xNum = 10 // number of squares in x
const yNum = 17 // number of squares in y
const spaceSquareRatio = 7 // ratio for size of space and square
const spaceSize = getSpaceSize()  // space size
const squareSize = spaceSize * spaceSquareRatio // square size
const offsetY = getOffsetY()  // center the squares

const time_drop = 0.8  // period to force drop
const time_drop_adjust = 0.99 // every score up, decrease drop time by this factor
const time_stop = 0.5 // time player can adjust pos at bottom
const time_move = 0.05 // minimum time interval to move
const time_rotate = 0.2 // minimum time interval to rotate
const time_to_quick = 0.15 // time interval to activate quick move mode
const time_before_drop = 0.3 // time to wait from one stop to drop
const time_quick_drop = 0.01 // minimum time interval to drop in quick mode
const time_move_quick = 0.015 // minimum time interval to move in quick mode
const time_to_straight_drop = 0.3 // time to do another down straight

const colors = {
  black: 'rgba(0, 0, 0, 1)',
  white: 'rgba(255, 255, 255, 1)',
  red: 'rgba(255, 0, 0, 1)',
  green: 'rgba(0, 255, 0, 1)',
  blue: 'rgba(0, 0, 255, 1)',
  yellow: 'rgba(255, 255, 0, 1)',
  purple: 'rgba(255, 0, 255, 1)',
  cyan: 'rgba(0, 255, 255, 1)',
  none: 'rgba(45, 45, 45, 1)',  // dark grey
  tip: 'rgba(100, 100, 100, 1)',  // grey
  bg: 'rgba(30, 30, 30, 1)', // black
  square: 'rgba(245, 245, 245, 1)',  // white
  space: 'rgba(25, 25, 25, 1)'  // slightly lighter than bg
}

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.squares = []
    this.fillBackground()
    this.initSquares()
    this.activeX = 0
    this.activeY = 0
    this.activeColor = colors.cyan
    this.start()
  }

  start() {
    // this.renderActive()
    setInterval(this.down.bind(this), 500)
  }

  down(){
    this.activeY += 1
    this.renderActive()
  }

  renderActive() {
    this.squares[this.activeY][this.activeX].color = this.activeColor
    this.squares[this.activeY][this.activeX].render(ctx)

  }

  initSquares(){
    for (var y = 0; y < yNum; y++) {
      var row = []
      for (var x = 0; x < xNum; x++){
        var square = new Square(x, y, colors.none, squareSize, spaceSize, offsetY)
        square.render(ctx)
        row.push(square)
      }
      this.squares.push(row)
    }
  }

  fillBackground (){
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.space
    ctx.fill();
    ctx.closePath()
  }
}

function getSpaceSize(){
  const spaceBwtween = xNum - 1
  const numSpaces = xNum * spaceSquareRatio + spaceBwtween
  const spaceSize = canvas.width / numSpaces
  return spaceSize
}

function getOffsetY(){
  const spaceBetween = yNum - 1
  const numSpaces = yNum * spaceSquareRatio + spaceBetween
  const spaceLengthTotal = numSpaces * spaceSize
  const offsetY = (canvas.height - spaceLengthTotal) / 2
  return offsetY
}