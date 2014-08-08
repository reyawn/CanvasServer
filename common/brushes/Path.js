var _ = require("underscore");
var Q = require("q");
var Brush = require("../Brush");

var Path = module.exports = function () {};
Path.prototype = Object.create(Brush.prototype);
Path.prototype.constructor = Path;

Path.prototype.assertStroke = function (canvas, data) {
    return Brush.prototype.assertStroke.apply(this, arguments).then(function () {
        if (!_.isArray(data.subPaths)) {
            throw new Error("stroke path data invalid");
        }
    });
};

// note: This implementation of stroke() does not
// yet do range checking or other validation on
// values to ensure that they are of valid type
// or fall within the canvas.
Path.prototype.stroke = function (canvas, data) {

    // execute drawing operation on next pass
    // and return a promise for its completion
    return Q.fcall(function () {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        for (var i = 0, n = data.subPaths.length; i < n; i++) {

            // quick escape if we detect a bad sub-path
            if (!_.isArray(data.subPaths[i])) {
                throw new Error("stroke path data invalid");
            }

            // a sub-path's type is determined by its number
            // of arguments (in this case, array length)
            switch (data.subPaths[i].length) {
                case 2:
                    // a line
                    ctx.lineTo.apply(ctx, data.subPaths[i]);
                    break;
                case 4:
                    // a quadratic bezier curve
                    ctx.quadraticCurveTo.apply(ctx, data.subPaths[i]);
                    break;
                case 6:
                    // a bezier curve
                    ctx.bezierCurveTo.apply(ctx, data.subPaths[i]);
                    break;
                default:
                    // Bad data
                    throw new Error("stroke path data invalid");
                    return;
            }
        }
        ctx.stroke();
        console.log("path drawn successfully");
    });
};