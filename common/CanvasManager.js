var Q = require("q");
var brushes = require("./brushes");

var CanvasManager = module.exports = function () {};

CanvasManager.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;
};

CanvasManager.prototype.handleStroke = function (data) {
    var self = this;
    var brush;
    if (brushes.hasOwnProperty(data.b)) {
        brush = brushes[data.b];
        return brush.assertStroke(this.canvas, data).then(function () {
            brush.stroke(self.canvas, data).catch(function (e) {
                console.error(e);
            });
        });
    } else {
        return Q.reject(new Error("stroke error: brush " + data.b + " not found"));
    }
};