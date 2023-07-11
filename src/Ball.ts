import { Coordinate, Rectangle } from "./model";

const INITIAL_SPEED = 10;
const INCREMENT_SPEED = 2;
const MAX_SPEED = 40;

export class Ball {
    private speed: number = INITIAL_SPEED;
    private axiosXDirection: 1 | -1 = 1;
    private axiosYDirection: 1 | -1 = 1;
    private isPaused = false;
    private coordinate: Coordinate = {
        x: 0,
        y: 0,
    };

    constructor(
        private readonly canvasContext: CanvasRenderingContext2D,
        private readonly radius: number = 10,
        private readonly color: string = "#ffffff",
    ) {}

    reset() {
        this.coordinate.x = this.canvasContext.canvas.width / 2;
        this.coordinate.y = this.canvasContext.canvas.height / 2;
        this.isPaused = true;
    }

    speedUp() {
        this.speed += INCREMENT_SPEED;
        if (this.speed > MAX_SPEED) {
            this.speed = MAX_SPEED;
        }
    }

    speedDown() {
        this.speed -= INCREMENT_SPEED;
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    stop() {
        this.isPaused = true;
    }

    start() {
        this.isPaused = false;
    }

    reverseXAxis() {
        this.axiosXDirection *= -1;
    }

    reverseYAxis() {
        this.axiosYDirection *= -1;
    }

    get position(): Coordinate {
        return this.coordinate;
    }

    get rectangle(): Rectangle {
        return {
            x0: this.coordinate.x - this.radius,
            y0: this.coordinate.y - this.radius,
            x1: this.coordinate.x + this.radius,
            y1: this.coordinate.y + this.radius,
        };
    }

    draw() {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, 2 * Math.PI, false);
        this.canvasContext.fill();
    }

    move() {
        this.coordinate.x += this.axiosXDirection * (this.isPaused ? 0 : this.speed);
        this.coordinate.y += this.axiosYDirection * (this.isPaused ? 0 : this.speed);
    }
}
