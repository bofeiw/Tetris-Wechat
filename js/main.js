import Square from './res/square'

const xNum = 9 // number of squares in x
const yNum = 16 // number of squares in y
const spaceSquareRatio = 8 // ratio for size of space and square
const spaceSize = getSpaceSize()  // space size
const squareSize = spaceSize * spaceSquareRatio // square size
const squareHeightSum = getSaureHeightSum() // sum height in y
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

const ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.activeColor = colors.red
  }

  start() {
    this.squares = []
    this.initSquares()
    this.isLooping = true
    if (this.isLooping){
      this.render()
      this.resetActive()
    }
  }
  
  resetActive() {
    clearInterval(this.intervalID)
    this.activeX = Math.floor(xNum / 2)
    this.activeY = 0
    this.addActive()
    this.render()
    if (this.shouldStop()) {
      this.gameOver()
      return
    }
    this.intervalID = setInterval(this.down.bind(this), 100)
  }

  /**
   * game over
   */
  gameOver() {
    var that = this
    this.isLooping = false
    console.log("lose")
    // show a dialog box to ask if to play again
    wx.showModal({
      title: 'Game Over',
      content: 'Are you a loser?',
      cancelText: 'Sure',
      cancelColor: '#ff0000',
      confirmText: 'No',
      // confirmColor: '00ff00',
      success: function (res) {
        if (res.confirm) {
          that.start()
        }
      }
    })
  }

  /**
   * moves down
   */
  down() {
    this.move(0, 1)
  }

  /**
   * proceed to stop
   */
  stop(){
    this.commitActive()
    this.resetActive()
  }

  /**
   * return whether should stop
   */
  shouldStop() {
    return !this.validPosition(this.activeX, this.activeY + 1)
  }

  /**
   * moves the squre by distance x, y
   */
  move(x, y) {
    var newX = this.activeX + x
    var newY = this.activeY + y
    if (this.validPosition(newX, newY)) {
      this.clearActive()
      this.activeX = newX
      this.activeY = newY
      this.addActive()
      this.render()
    }
    if (this.shouldStop()){
      this.stop()
    }
  }

  /**
   * validate position with active shape
   */
  validPosition(x, y){
    // validate it is in screen
    if (! (0 <= x && x < xNum && 0 <= y && y < yNum)){
      return false
    }
    // validate square occupation
    if (this.squares[y][x].color != colors.none){
      return false
    }
    return true
  }

  /**
   * render the whole new window
   */
  render() {
    this.fillBackground()
    this.renderSquares()
  }

  /**
   * render all squares
   */
  renderSquares() {
    for (let y = 0; y < yNum; y++) {
      for (let x = 0; x < xNum; x++) {
        this.squares[y][x].render(ctx)
      }
    }
  }

  /**
   * add active square to squares
   */
  addActive() {
    this.squares[this.activeY][this.activeX].color = this.activeColor
  }

  /**
   * remove active square from squares
   */
  clearActive() {
    this.squares[this.activeY][this.activeX].color = colors.none
  }

  /**
   * commit active square into squares
   */
  commitActive() {
    this.squares[this.activeY][this.activeX].color = colors.square
  }

  initSquares(){
    for (let y = 0; y < yNum; y++) {
      var row = []
      for (let x = 0; x < xNum; x++){
        row.push(new Square(x, y, colors.none, squareSize, spaceSize, offsetY))
      }
      this.squares.push(row)
    }
  }

  fillBackground (){
    // fill whole bg 
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.black
    ctx.fill();
    ctx.closePath()
    // fill space
    ctx.beginPath()
    ctx.rect(0, offsetY, canvas.width, squareHeightSum);
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

function getSaureHeightSum() {
  const spaceBetween = yNum - 1
  const numSpaces = yNum * spaceSquareRatio + spaceBetween
  const spaceLengthTotal = numSpaces * spaceSize
  return spaceLengthTotal
}

function getOffsetY(){
  const offsetY = (canvas.height - squareHeightSum) / 2
  return offsetY
}