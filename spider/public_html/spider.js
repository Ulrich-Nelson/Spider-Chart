function SpiderChart(canvas, labels, targets, interiorRatios) {
    this.canvas = canvas;
    this.labels = labels;
    this.coefficients = targets[0].coefficients;
    this.numberOfSides = this.coefficients.length;
    this.interiorRatios = interiorRatios;
    this.centerX = 300;
    this.centerY = 300;
}

SpiderChart.prototype.display = function () {
    let context = this.canvas.getContext("2d");
    let radius = 200;
    let labelExtent = 10;

    // Compute label polygon
    let labelPolygon = this.computePolygon(this.numberOfSides, labelExtent + radius);

    // Compute norm polygon
    let normPolygon = this.computePolygon(this.numberOfSides, radius, true);

    // Compute interior polygons
    let  interiorPolygons = [];
    for (let i = 0; i < this.interiorRatios.length; i += 1) {
        interiorPolygons[i] = this.computePolygon(this.numberOfSides, interiorRatios[i] * radius, true);
    }

    // Compute target polygon
    let targetPolygon = this.computeTargetPolygon(this.numberOfSides, normPolygon);

    // Draw norm polygon
    this.drawPolygon(context, this.numberOfSides, normPolygon.x, normPolygon.y, "black", 2);

    // Draw target polygon
    this.drawPolygon(context, this.numberOfSides, targetPolygon.x, targetPolygon.y, "red", 1);

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
    for (let i = 0; i < this.numberOfSides; i += 1) {
        context.textAlign = labelPolygon.x[i] < this.centerX ? "right" : "left";
        context.fillText(this.labels[i], labelPolygon.x[i], labelPolygon.y[i]);
    }

    // Draw interior polygons
    for (let i = 0; i < interiorPolygons.length; i += 1) {
        this.drawPolygon(context, this.numberOfSides, interiorPolygons [i].x, interiorPolygons[i].y, "black", 1);
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

SpiderChart.prototype.computeTargetPolygon = function (n, normPolygon) {
    let x = [];
    let y = [];
    for (let i = 0; i < n; i += 1) {
        x[i] = this.coefficients[i] * (normPolygon.x[i] - this.centerX) + this.centerX;
        y[i] = this.coefficients[i] * (normPolygon.y[i] - this.centerY) + this.centerY;
    }
    x[n] = x[0];
    y[n] = y[0];
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
