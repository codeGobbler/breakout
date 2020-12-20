//declare variables for html elements
let canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

//declare game variables
let score = 0;
let brickRowCount = 9;
let brickColumnCount = 5;

//rules and close event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));

//create ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 2,
  speed: 4,
  dx: 4,
  dy: -4
}

//create paddle object
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height -20,
  w: 20,
  h: 5,
  speed: 8,
  dx: 0
}

//create brick object
const brickInfo = {
  w: 20,
  h: 5,
  padding: 5,
  offsetX: 35,
  offsetY: 25,
  visible: true
}

//create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = {x, y, ...brickInfo}
  }
}

//draw ball on canvas
const drawBall = (ball) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle="#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
const drawPaddle = (paddle) => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillstyle="#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw score on canvas
const drawScore = () => {
  ctx.font = "10px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 50, 20);
}

//draw bricks on canvas
const drawBricks = () => {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd': 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  })
}

//animation
//put all drawings inside a draw function to continually re-draw them to the canvas(animate)
const draw = () => {
  drawBall(ball);
  drawPaddle(paddle);
  drawScore();
  drawBricks();
}

draw();