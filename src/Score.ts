export class Score {
    private leftScore: number = 0;
    private rightScore: number = 0;

    constructor(
        private readonly canvasContext: CanvasRenderingContext2D,
        private readonly color: string = "#01341D",
        protected readonly gap: number = 20,
    ) {}

    draw() {
        const width = this.canvasContext.canvas.width;
        const height = this.canvasContext.canvas.height;

        this.canvasContext.font = "bold 72px Arial";
        this.canvasContext.textAlign = "center";
        this.canvasContext.textBaseline = "top";
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillText(this.leftScore.toString(), width / 4, this.gap);
        this.canvasContext.fillText(this.rightScore.toString(), width / 4 + width / 2, this.gap);
        this.canvasContext.font = "bold 12px Arial";
        this.canvasContext.textBaseline = "bottom";
        this.canvasContext.fillText("Made by Eduardo Donato (@ebdonato)", width / 2, height - this.gap);
    }

    increaseLeftScore() {
        this.leftScore++;
    }

    increaseRightScore() {
        this.rightScore++;
    }

    reset() {
        this.leftScore = 0;
        this.rightScore = 0;
    }
}
