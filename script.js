var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var speed = 10;

//variables for ball
var x = canvas.width/2
var y = canvas.height-30

var dx = 2;
var dy = -2;

var colour = "#FAE447"

var ballRadius = 10;

//variables for paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2

var rightkey = false;
var leftkey = false;

// variable for the bricks
var brickRowCount = 5;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for(var j = 0; j < brickRowCount; j++) {
        bricks[i][j] = {x: 0, y: 0}
    }
}

//check keypresses
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(key) {
	if(key.keyCode == 37) {
		leftkey = true;
	}
	else if(key.keyCode == 39) {
		rightkey = true;
	} 
}

function keyUp(key) {
	if(key.keyCode == 37) {
		leftkey = false;
	}
	else if(key.keyCode == 39) {
		rightkey = false;
	} 
}

//drawing on the canvas
function drawBall() {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = colour
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
	ctx.fillStyle = "#E5511D"
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
    for(var i = 0; i < brickColumnCount; i++) {
        for(var j = 0; j < brickRowCount; j++) {
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#E5511D";
            ctx.fill();
            ctx.closePath();
        }
    }
}


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks();
	drawBall();
	drawPaddle();

	//check if ball hits border and change direction
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy * 1.05
        } else {
            alert("Game over! :( ")
            document.location.reload();    
        }
    }

	if(x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
		dx = -dx;
		colour = colours[Math.floor(Math.random() * 10)]
	}

	//moving the paddle
	if(rightkey && paddleX < canvas.width-paddleWidth) {
		paddleX += 4;
	}
	if(leftkey && paddleX > 0) {
		paddleX -= 4;
	}

	x += dx;
	y += dy;

}

setInterval(draw, speed)











