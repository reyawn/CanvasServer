var http = require("http");
var ws = require("ws");
var Q = require("q");
var Canvas = require("canvas");
var managers = require("./managers");

var CanvasServer = module.exports = function (options) {
    options = options || {};
    this.port = options.port || 8080;
    this.canvas = new Canvas(options.width || 1024, options.height || 768);

    managers.getCanvasManager().setCanvas(this.canvas);
};

CanvasServer.prototype.onWebSocketConnection = function (socket) {
    managers.getSocketClientManager().handleConnection(socket);
};

// NOTE: the http server needs to serve (likely in a different component):
// - static client files
// - initial canvas state
CanvasServer.prototype.startHttpServer = function () {
    var deferred = Q.defer();
    var httpServer = this.httpServer = http.createServer();
    httpServer.once("listening", function () {
        deferred.resolve(httpServer);
    });
    httpServer.once("error", function (err) {
        deferred.reject(err);
    });
    httpServer.listen(this.port);
    return deferred.promise;
};

CanvasServer.prototype.startWebSocketServer = function (httpServer) {
    var wsServer = this.wsServer = new ws.Server({server: httpServer});
    wsServer.on("connection", this.onWebSocketConnection.bind(this));
};

CanvasServer.prototype.start = function () {
    return this.startHttpServer()
        .then(this.startWebSocketServer.bind(this));
};