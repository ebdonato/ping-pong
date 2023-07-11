import { Coordinate, Rectangle } from "./model";

const INITIAL_SPEED = 10;
const INCREMENT_SPEED = 2;
const MAX_SPEED = 40;

export class UserPaddle {
    protected threshold: number = -10;
    protected position: number = 100;

    constructor(
        protected readonly canvasContext: CanvasRenderingContext2D,
        protected readonly color: string = "#ffff00",
        protected readonly thickness: number = 2,
        protected readonly size: number = 200,
        protected readonly gap: number = 20,
    ) {}

    get rectangle(): Rectangle {
        return {
            x0: this.threshold,
            y0: this.position,
            x1: this.threshold + this.thickness,
            y1: this.position + this.size,
        };
    }

    draw() {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(this.threshold, this.position, this.thickness, this.size);
    }

    move(coordinate: Coordinate) {
        this.threshold = this.gap;
        this.position = coordinate.y - this.size / 2;
    }
}

export class ComputerPaddle extends UserPaddle {
    private speed: number = INITIAL_SPEED;

    constructor(
        protected readonly canvasContext: CanvasRenderingContext2D,
        protected readonly color: string = "#ff0000",
        protected readonly thickness: number = 2,
        protected readonly size: number = 200,
        protected readonly gap: number = 20,
    ) {
        super(canvasContext, color, thickness, size, gap);
    }

    reset() {
        this.speed = INITIAL_SPEED;
        this.position = this.canvasContext.canvas.height / 2 + this.size / 2;
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

    move(coordinate: Coordinate) {
        this.threshold = this.canvasContext.canvas.width - this.gap - this.thickness;
        this.position = this.position + (this.position + this.size / 2 < coordinate.y ? 1 : -1) * this.speed;
    }
}
