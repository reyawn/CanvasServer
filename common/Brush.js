var Q = require("q");
var Brush = module.exports = function () {};

Brush.prototype.assertStroke = function (canvas, data) {
    if (!canvas || !data) {
        return Q.reject(new Error("Stroke data invalid"));
    }
    return Q();
};

// dummy "stroke" method
Brush.prototype.stroke = function (canvas, data) {
    return Q();
};