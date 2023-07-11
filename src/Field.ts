export class Field {
    constructor(
        private readonly canvasContext: CanvasRenderingContext2D,
        private readonly thickness: number = 3,
        private readonly backgroundColor: string = "#286047",
        private readonly foregroundColor: string = "#3c9b70",
    ) {}

    draw() {
        const width = this.canvasContext.canvas.width;
        const height = this.canvasContext.canvas.height;

        this.canvasContext.fillStyle = this.backgroundColor;
        this.canvasContext.fillRect(0, 0, width, height);

        this.canvasContext.fillStyle = this.foregroundColor;
        this.canvasContext.fillRect(width / 2 - this.thickness / 2, 0, this.thickness, height);
    }
}
