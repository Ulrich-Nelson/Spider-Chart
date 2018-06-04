function SpiderChart(canvas, coefficients) {
    this.canvas = canvas;
    this.coefficients = coefficients;
}

SpiderChart.prototype.display = function () {
    let context = this.canvas.getContext("2d");

    let numberOfSides = 5;
    let size = 200;
    let Xcenter = 205;
    let Ycenter = 205;

    // Compute norm coordinates
    let norm_x = [];
    let norm_y = [];
    for (let i = 0; i <= numberOfSides; i += 1) {
        norm_x[i] = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
        norm_y[i] = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
    }

    // Compute target coordinates
    let target_x = [];
    let target_y = [];
    for (let i = 0; i < numberOfSides; i += 1) {
        target_x[i] = this.coefficients[i] * (norm_x[i] - Xcenter) + Xcenter;
        target_y[i] = this.coefficients[i] * (norm_y[i] - Ycenter) + Ycenter;
    }
    target_x[numberOfSides] = target_x[0];
    target_y[numberOfSides] = target_y[0];

    // Draw polygon of norms
    context.beginPath();
    context.moveTo(norm_x[0], norm_y[0]);
    for (let i = 1; i <= numberOfSides; i += 1) {
        context.lineTo(norm_x[i], norm_y[i]);
    }
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();

    // Draw polygon of target
    context.beginPath();
    context.moveTo(target_x[0], target_y[0]);
    for (let i = 1; i <= numberOfSides; i += 1) {
        context.lineTo(target_x[i], target_y[i]);
    }
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();

    // Draw center
    context.beginPath();
    context.fillStyle = "black";
    context.arc(Xcenter, Ycenter, 2, 0, 2 * Math.PI);
    context.fill();
};
