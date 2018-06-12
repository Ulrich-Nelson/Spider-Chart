function SpiderChart(canvas, labels, coefficients, interiorRatios) {
    this.canvas = canvas;
    this.labels = labels;
    this.coefficients = coefficients;
    this.interiorRatios = interiorRatios;
    this.centerX = 300;
    this.centerY = 300;
}

SpiderChart.prototype.display = function () {
    let context = this.canvas.getContext("2d");

    let numberOfSides = this.coefficients.length;
    let radius = 200;
    let labelExtent = 10;

    // Compute label coordinates
    let labels = this.computePolygon(numberOfSides, labelExtent + radius);

    // Compute norm coordinates
    let norms = this.computePolygon(numberOfSides, radius, true);

    // Compute interior polygons
    let  interiorPolygons = [];
    for (let i = 0; i < this.interiorRatios.length; i += 1) {
        interiorPolygons [i] = this.computePolygon(numberOfSides, interiorRatios[i] * radius, true);
    }

    // Compute target coordinates
    let target_x = [];
    let target_y = [];
    for (let i = 0; i < numberOfSides; i += 1) {
        target_x[i] = this.coefficients[i] * (norms.x[i] - this.centerX) + this.centerX;
        target_y[i] = this.coefficients[i] * (norms.y[i] - this.centerY) + this.centerY;
    }
    target_x[numberOfSides] = target_x[0];
    target_y[numberOfSides] = target_y[0];

    // Draw polygon of norms
    this.drawPolygon(context, numberOfSides, norms.x, norms.y, "black", 2);

    // Draw polygon of target
    this.drawPolygon(context, numberOfSides, target_x, target_y, "red", 1);

    // Draw center
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.centerX, this.centerY, 2, 0, 2 * Math.PI);
    context.fill();

    // Draw labels
    context.beginPath();
    context.font = "20px Arial";
    context.textBaseline = "middle";
    context.fillStyle = "MediumBlue";
    for (let i = 0; i < numberOfSides; i += 1) {
        context.textAlign = labels.x[i] < this.centerX ? "right" : "left";
        context.fillText(this.labels[i], labels.x[i], labels.y[i]);
    }

    // Draw interior polygons
    
    for (let i= 0; i < interiorPolygons.length; i += 1) {
        this.drawPolygon(context, numberOfSides, interiorPolygons [i].x,interiorPolygons[i].y, "black", 1);
    }
};

SpiderChart.prototype.computePolygon = function (n, radius, closed = false) {
    let x = [];
    let y = [];
    let count = closed ? n + 1 : n;
    for (let i = 0; i < count; i += 1) {
        x[i] = this.centerX + radius * Math.cos(i * 2 * Math.PI / n);
        y[i] = this.centerY + radius * Math.sin(i * 2 * Math.PI / n);
    }
    return {x: x, y: y};
};

SpiderChart.prototype.drawPolygon = function (context, n, x, y, color, lineWidth) {
    context.beginPath();
    context.moveTo(x[0], y[0]);
    for (let i = 1; i <= n; i += 1) {
        context.lineTo(x[i], y[i]);
    }
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
};
