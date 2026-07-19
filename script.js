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