const pikeCount = 5;
const cornerCount = 2 * pikeCount;

const starCount = 5;

function degreesToRadians(deg: number): number {
    return deg * Math.PI / 180;
}

window.onload = () => {
    const canvas = document.getElementById('myCanvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error('No canvas found!');
    }

    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get context!');
    }

    const height = canvas.height;
    const width = canvas.width;

    // make background transparent
    ctx.clearRect(0, 0, width, height)

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.lineWidth = 2;

    for (let i = 0; i <= starCount; i++) {
        const starHeight = (height / starCount) * i;
        const starWidth = (width / starCount) * i;

        drawStar(ctx, starHeight, starWidth, centerX, centerY);
    }

    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.onclick = () => {
            // @ts-ignore
            window.location = canvas.toDataURL('image/png', 1.0);
        };
    }
};

function drawStar(
    ctx: CanvasRenderingContext2D,
    height: number,
    width: number,
    centerX: number,
    centerY: number
): void {

    const singleAngleDegrees = 360 / cornerCount;

    ctx.beginPath();

    for (let i = 0; i <= cornerCount; i++) {
        const angleRadians = degreesToRadians(singleAngleDegrees * i);

        const isInnerCorner = i % 2 == 1;

        const distance = isInnerCorner ? height / 2 : height / 5;

        const pointX = centerX + Math.sin(angleRadians) * distance;
        const pointY = centerY + Math.cos(angleRadians) * distance;

        ctx.lineTo(pointX, pointY);
    }

    ctx.stroke();
    ctx.closePath();
}
