// ======================================
// PROFESSIONAL PONG GAME
// SCRIPT.JS - PART 1
// ======================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const game = {
    running: false,
    paused: false,
    scoreLeft: 0,
    scoreRight: 0,
    level: 1
};

const player = {
    x: 40,
    y: 200,
    width: 16,
    height: 140,
    speed: 8
};

const ai = {
    width: 16,
    height: 140,
    speed: 6,
    get x() {
        return canvas.width - 56;
    },
    y: 200
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 12,
    speedX: 7,
    speedY: 5
};

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function updatePlayer() {
    if (keys["ArrowUp"]) {
        player.y -= player.speed;
    }

    if (keys["ArrowDown"]) {
        player.y += player.speed;
    }

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function updateAI() {
    const center = ai.y + ai.height / 2;

    if (center < ball.y) {
        ai.y += ai.speed;
    } else {
        ai.y -= ai.speed;
    }

    if (ai.y < 0) ai.y = 0;
    if (ai.y + ai.height > canvas.height) {
        ai.y = canvas.height - ai.height;
    }
}

function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y < ball.radius ||
        ball.y > canvas.height - ball.radius) {
        ball.speedY *= -1;
    }

    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.speedX *= -1;
    }

    if (
        ball.x + ball.radius > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + ai.height
    ) {
        ball.speedX *= -1;
    }
}
// ======================================
// SCRIPT.JS - PART 2
// Drawing + Score + Reset
// ======================================

function drawBackground() {
ctx.fillStyle = "#050505";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#00ffff";  
ctx.lineWidth = 4;  

for (let i = 0; i < canvas.height; i += 30) {  
    ctx.beginPath();  
    ctx.moveTo(canvas.width / 2, i);  
    ctx.lineTo(canvas.width / 2, i + 15);  
    ctx.stroke();  
}

}

function drawPaddle(x, y, w, h, color) {
ctx.fillStyle = color;
ctx.shadowBlur = 20;
ctx.shadowColor = color;
ctx.fillRect(x, y, w, h);
ctx.shadowBlur = 0;
}

function drawBall() {
ctx.beginPath();
ctx.fillStyle = "#ffffff";
ctx.shadowBlur = 25;
ctx.shadowColor = "#00ffff";
ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();
ctx.shadowBlur = 0;
}

function drawScore() {
ctx.fillStyle = "white";
ctx.font = "50px Arial";
ctx.textAlign = "center";

ctx.fillText(  
    game.scoreLeft,  
    canvas.width / 2 - 80,  
    60  
);  

ctx.fillText(  
    game.scoreRight,  
    canvas.width / 2 + 80,  
    60  
);

}

function resetBall() {
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;

ball.speedX = Math.random() > 0.5 ? 7 : -7;  
ball.speedY = (Math.random() * 6) - 3;

}

function checkScore() {

if (ball.x < 0) {  

    game.scoreRight++;  

    resetBall();  

}  

if (ball.x > canvas.width) {  

    game.scoreLeft++;  

    resetBall();  

}  

if (game.scoreLeft >= 10) {  

    alert("PLAYER WINS!");  

    game.scoreLeft = 0;  

    game.scoreRight = 0;  

}  

if (game.scoreRight >= 10) {  

    alert("AI WINS!");  

    game.scoreLeft = 0;  

    game.scoreRight = 0;  

}

}

function gameLoop() {

updatePlayer();  

updateAI();  

updateBall();  

checkScore();  

drawBackground();  

drawPaddle(  
    player.x,  
    player.y,  
    player.width,  
    player.height,  
    "#00ffff"  
);  

drawPaddle(  
    ai.x,  
    ai.y,  
    ai.width,  
    ai.height,  
    "#ff0066"  
);  

drawBall();  

drawScore();  

requestAnimationFrame(gameLoop);

}

gameLoop();