function SpiderChart(container, data, options) {
    this.container = container;
    this.data = data;
    this.options = options;
    this.labels = data.labels;
    this.targets = data.targets;
    this.numberOfSides = this.targets[0].coefficients.length;
    this.interiorRatios = data.interiorRatios;
    this._createCanvas(container);
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    if (this.options.hasOwnProperty("ratioX") && this.options.hasOwnProperty("ratioY")) {
        this.radius = Math.min(this.centerX * this.options.ratioX, this.centerY * this.options.ratioY);
    } else {
        this.radius = Math.min(this.centerX * 0.5, this.centerY * 0.5);
    }
}

SpiderChart.prototype.display = function () {
    let context = this.canvas.getContext("2d");
    let labelExtent = 10;

    // Compute polygons: norm, target, label, interior
    let normPolygon = this._computePolygon(this.numberOfSides, this.radius, true);
    let targetPolygons = this._computeTargetPolygons(normPolygon);
    let labelPolygon = this._computePolygon(this.numberOfSides, labelExtent + this.radius);
    let interiorPolygons = this._computeInteriorPolygons();

    // Draw polygons: norm, target, interior
    this._drawPolygon(context, this.numberOfSides, normPolygon.x, normPolygon.y, "black", 2);
    this._drawTargetPolygons(context, targetPolygons);
    this._drawInteriorPolygons(context, interiorPolygons);

    // Draw center
    this._drawCenter(context);

    // Draw Lines
    this._drawLines(context, this.numberOfSides, normPolygon.x, normPolygon.y, 1);

    // Draw labels
    this._drawLabels(context, labelPolygon);

    // Draw target vertices
    this._drawTargetVertices(context, targetPolygons);

    // Draw legend
    this._drawLegend(context);
};

SpiderChart.prototype._createCanvas = function (container) {
    this.canvas = document.createElement("canvas");
    if (this.options.hasOwnProperty("width")) {
        this.canvas.width = this.options.width;
    }
    if (this.options.hasOwnProperty("height")) {
        this.canvas.height = this.options.height;
    }
    if (this.options.hasOwnProperty("backgroundColor")) {
        this.canvas.style.backgroundColor = this.options.backgroundColor;
    }
    container.appendChild(this.canvas);
};

SpiderChart.prototype._computePolygon = function (n, radius, closed = false) {
    let x = [];
    let y = [];
    let count = closed ? n + 1 : n;
    for (let i = 0; i < count; i += 1) {
        x[i] = this.centerX + radius * Math.cos(i * 2 * Math.PI / n);
        y[i] = this.centerY + radius * Math.sin(i * 2 * Math.PI / n);
    }
    return {x: x, y: y};
};

SpiderChart.prototype._computeTargetPolygon = function (n, normPolygon, index) {
    let x = [];
    let y = [];
    for (let i = 0; i < n; i += 1) {
        x[i] = this.targets[index].coefficients[i] * (normPolygon.x[i] - this.centerX) + this.centerX;
        y[i] = this.targets[index].coefficients[i] * (normPolygon.y[i] - this.centerY) + this.centerY;
    }
    x[n] = x[0];
    y[n] = y[0];
    return {x: x, y: y};
};

SpiderChart.prototype._computeInteriorPolygons = function () {
    let  interiorPolygons = [];
    for (let i = 0; i < this.interiorRatios.length; i += 1) {
        interiorPolygons[i] = this._computePolygon(this.numberOfSides, this.interiorRatios[i] * this.radius, true);
    }
    return interiorPolygons;
};

SpiderChart.prototype._computeTargetPolygons = function (normPolygon) {
    let targetPolygons = [];
    for (let i = 0; i < this.targets.length; i += 1) {
        let targetPolygon = this._computeTargetPolygon(this.numberOfSides, normPolygon, i);
        targetPolygons.push(targetPolygon);
    }
    return targetPolygons;
};

SpiderChart.prototype._drawPolygon = function (context, n, x, y, color, lineWidth) {
    context.beginPath();
    context.moveTo(x[0], y[0]);
    for (let i = 1; i <= n; i += 1) {
        context.lineTo(x[i], y[i]);
    }
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
};

SpiderChart.prototype._drawLines = function (context, n, x, y, lineWidth) {
    context.beginPath();
    for (let i = 0; i < n; i += 1) {
        context.moveTo(this.centerX, this.centerY);
        context.lineTo(x[i], y[i]);
    }
    context.lineWidth = lineWidth;
    context.strokeStyle = 'DarkSlateGray';
    context.stroke();
};

SpiderChart.prototype._fillPolygon = function (context, n, x, y, color, lineWidth) {
    context.save();
    context.beginPath();
    context.moveTo(x[0], y[0]);
    for (let i = 1; i <= n; i += 1) {
        context.lineTo(x[i], y[i]);
    }
    context.strokeStyle = color;
    if (this.options.hasOwnProperty("alphaPolygons")) {
        context.globalAlpha = this.options.alphaPolygons;
    }
    context.lineWidth = lineWidth;
    context.fillStyle = color;
    context.fill();
    context.stroke();
    context.restore();
};

SpiderChart.prototype._drawCenter = function (context) {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.centerX, this.centerY, 2, 0, 2 * Math.PI);
    context.fill();
};

SpiderChart.prototype._getTargetColor = function (i) {
    let color = "black";
    if (this.options.hasOwnProperty("targetColors") && i < this.options.targetColors.length) {
        color = this.options.targetColors[i];
    }
    return color;
};

SpiderChart.prototype._drawTargetPolygons = function (context, targetPolygons) {
    for (let i = 0; i < this.targets.length; i += 1) {
        let targetPolygon = targetPolygons[i];
        let color = this._getTargetColor(i);
        this._fillPolygon(context, this.numberOfSides, targetPolygon.x, targetPolygon.y, color, 3);
    }
};

SpiderChart.prototype._drawTargetVertices = function (context, targetPolygons) {
    context.save();
    for (let i = 0; i < this.targets.length; i += 1) {
        let targetPolygon = targetPolygons[i];
        let color = this._getTargetColor(i);
        for (let j = 0; j < color.length; j += 1) {
            for (let k = 0; k < targetPolygon.x.length; k += 1) {
                context.beginPath();
                context.fillStyle = color;
                if (this.options.hasOwnProperty("alphaVertices")) {
                    context.globalAlpha = this.options.alphaVertices;
                }
                context.arc(targetPolygon.x[k], targetPolygon.y[k], 3, 0, 3 * Math.PI);
                context.fill();
            }
        }
    }
    context.restore();
};

SpiderChart.prototype._drawLabels = function (context, labelPolygon) {
    context.beginPath();
    if (this.options.hasOwnProperty("fontLabels")) {
        context.font = this.options.fontLabels;
    }
    context.textBaseline = "middle";
    if (this.options.hasOwnProperty("colorLabels")) {
        context.fillStyle = this.options.colorLabels;
    }
    for (let i = 0; i < this.numberOfSides; i += 1) {
        context.textAlign = labelPolygon.x[i] < this.centerX ? "right" : "left";
        context.fillText(this.labels[i], labelPolygon.x[i], labelPolygon.y[i]);
    }
};

SpiderChart.prototype._drawInteriorPolygons = function (context, interiorPolygons) {
    for (let i = 0; i < interiorPolygons.length; i += 1) {
        this._drawPolygon(context, this.numberOfSides, interiorPolygons [i].x, interiorPolygons[i].y, "#808080", 1);
    }
};

SpiderChart.prototype._drawLegend = function (context) {
    context.beginPath();
    context.font = "16px Arial";
    let fontHeight = 16;
    context.textBaseline = "top";
    for (let i = 0; i < this.targets.length; i++) {
        context.fillStyle = this._getTargetColor(i);
        context.fillText("--" + this.targets[i].name, 0, fontHeight * i);
    }
};
