function SpiderChart(canvas, labels, coefficients) {
    this.canvas = canvas;
    this.labels = labels;
    this.coefficients = coefficients;
}

SpiderChart.prototype.display = function () {
    let context = this.canvas.getContext("2d");

    let numberOfSides = this.coefficients.length;
    let radius = 200;
    let labelExtent = 10;
    let centerX = 300;
    let centerY = 300;

    // Compute label coordinates
    let label_x = [];
    let label_y = [];
    for (let i = 0; i < numberOfSides; i += 1) {
        label_x[i] = centerX + (labelExtent + radius) * Math.cos(i * 2 * Math.PI / numberOfSides);
        label_y[i] = centerY + (labelExtent + radius) * Math.sin(i * 2 * Math.PI / numberOfSides);
    }

    // Compute norm coordinates
    let norm_x = [];
    let norm_y = [];
    for (let i = 0; i <= numberOfSides; i += 1) {
        norm_x[i] = centerX + radius * Math.cos(i * 2 * Math.PI / numberOfSides);
        norm_y[i] = centerY + radius * Math.sin(i * 2 * Math.PI / numberOfSides);
    }

    // Compute target coordinates
    let target_x = [];
    let target_y = [];
    for (let i = 0; i < numberOfSides; i += 1) {
        target_x[i] = this.coefficients[i] * (norm_x[i] - centerX) + centerX;
        target_y[i] = this.coefficients[i] * (norm_y[i] - centerY) + centerY;
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
    context.arc(centerX, centerY, 2, 0, 2 * Math.PI);
    context.fill();

    // Draw labels
    context.beginPath();
    context.font = "20px Arial";
    context.textBaseline = "middle";
    for (let i = 0; i < numberOfSides; i += 1) {
        context.textAlign = label_x[i] < centerX ? "right" : "left";
        context.fillText(this.labels[i], label_x[i], label_y[i]);
    }
};
