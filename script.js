// Suppression des références à canvas et ctx
let ballRadius = 10;
let x = 100; // Position initiale de la balle en x
let y = 100; // Position initiale de la balle en y
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (window.innerWidth - paddleWidth) / 2; // Position initiale de la raquette en x
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function drawBall() {
    let ball = document.getElementById("ball");
    ball.style.left = x + "px";
    ball.style.top = y + "px";
}


function drawBricks() {
    let bricksDiv = document.getElementById("bricks");
    bricksDiv.innerHTML = ""; // Clear previous bricks

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brick = document.createElement("div");
                brick.style.width = brickWidth + "px";
                brick.style.height = brickHeight + "px";
                brick.style.backgroundColor = "brown";
                brick.style.position = "absolute";
                brick.style.left = (c * (brickWidth + brickPadding)) + brickOffsetLeft + "px";
                brick.style.top = (r * (brickHeight + brickPadding)) + brickOffsetTop + "px";
                bricksDiv.appendChild(brick);
            }
        }
    }
}

// Fonction de détection de collision
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (brick.status == 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    let brickElement = document.getElementById("brick" + c + "_" + r);
                    brickElement.style.display = "none"; // Masquer la brique frappée
                }
            }
        }
    }
}

function initializeBricks() {
    let bricksDiv = document.getElementById("bricks");

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = document.createElement("div");
            brick.style.width = brickWidth + "px";
            brick.style.height = brickHeight + "px";
            brick.style.backgroundColor = "#0095DD";
            brick.style.position = "absolute";
            brick.style.left = (c * (brickWidth + brickPadding)) + brickOffsetLeft + "px";
            brick.style.top = (r * (brickHeight + brickPadding)) + brickOffsetTop + "px";
            brick.id = "brick" + c + "_" + r;
            bricksDiv.appendChild(brick);
            bricks[c][r].x = brick.offsetLeft;
            bricks[c][r].y = brick.offsetTop;
        }
    }
}

function drawPaddle() {
    let paddle = document.getElementById("paddle");
    paddle.style.left = paddleX + "px";
}
// Appel à la fonction pour initialiser les briques
initializeBricks();

function draw() {
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > window.innerWidth - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > window.innerHeight - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (rightPressed && paddleX < window.innerWidth - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

let interval = setInterval(draw, 10);
