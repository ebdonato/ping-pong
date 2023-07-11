import "./style.css";
import { Field } from "./Field";
import { UserPaddle, ComputerPaddle } from "./Paddle";
import { Coordinate, Rectangle } from "./model";
import { Ball } from "./Ball";
import { Score } from "./Score";

const canvasElement = document.querySelector("canvas");

if (!canvasElement) {
    throw new Error("Could not get canvas element");
}

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

const canvasCtx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

if (!canvasCtx) {
    throw new Error("Could not get canvas context");
}

const field = new Field(canvasCtx);
const userPaddle = new UserPaddle(canvasCtx);
const computerPaddle = new ComputerPaddle(canvasCtx);
const ball = new Ball(canvasCtx);
const score = new Score(canvasCtx);

ball.reset();
score.reset();

function draw() {
    if (!canvasElement) {
        throw new Error("Could not get canvas element");
    }

    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    field.draw();
    score.draw();
    userPaddle.draw();
    computerPaddle.draw();
    ball.draw();
}

function move(event: MouseEvent) {
    const mouse: Coordinate = {
        x: event.pageX,
        y: event.pageY,
    };

    userPaddle.move(mouse);
}

const rectangleCollision = (rectA: Rectangle, rectB: Rectangle) =>
    rectA.x0 <= rectB.x1 && rectA.x1 >= rectB.x0 && rectA.y0 <= rectB.y1 && rectA.y1 >= rectB.y0;

const someoneScores = () => {
    ball.reset();
    ball.reverseXAxis();
    ball.speedUp();
};

function main() {
    ball.move();

    const ballRectangle = ball.rectangle;
    const leftRectangle = userPaddle.rectangle;
    const rightRectangle = computerPaddle.rectangle;

    computerPaddle.move(ball.position);

    // reflect the ball if it hits top or bottom
    if (ballRectangle.y0 > canvasCtx.canvas.height || ballRectangle.y1 < 0) {
        ball.reverseYAxis();
    }

    // reflect the ball if it hits left paddle or right paddle
    if (rectangleCollision(ballRectangle, leftRectangle) || rectangleCollision(ballRectangle, rightRectangle)) {
        ball.reverseXAxis();
    }

    // left paddle scores
    if (ball.rectangle.x1 > canvasCtx.canvas.width) {
        someoneScores();
        score.increaseLeftScore();
    }

    // right paddle scores
    if (ball.rectangle.x0 < 0) {
        someoneScores();
        score.increaseRightScore();
    }

    draw();
}

window.addEventListener("resize", draw);

canvasElement.addEventListener("mousemove", move);

canvasElement.addEventListener("click", () => {
    ball.start();
});

window.setInterval(main, 1000 / 60);
