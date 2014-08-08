var EventEmitter = require("events").EventEmitter;
var canvasManager = require("./managers").getCanvasManager();

var SocketClient = function (id, socket) {
    EventEmitter.call(this);
    this.id = id;
    this.socket = socket;

    // setup socket event handling
    socket.on("message", this.onMessage.bind(this));
    socket.once("close", this.onClose.bind(this));
    socket.on("error", this.onError.bind(this));
};

SocketClient.prototype = Object.create(EventEmitter.prototype);
SocketClient.prototype.constructor = SocketClient;

SocketClient.prototype.onMessage = function (data, flags) {
    if (flags && flags.binary) {
        console.error("invalid message: binary not supported");

        // binary messages are not supported
        this.socket.close(1003, "invalid message: binary not supported")
        return;
    }

    var message;
    try {
        message = JSON.parse(data);
    } catch (e) {
        console.error("invalid message: parse failure\n", e);

        // disconnect
        this.socket.close(1008, "invalid message: parse failure");
        return;
    }

    this.handleMessage(message).catch(function (e) {
        console.error("error handling message:\n", e);
    });
};

SocketClient.prototype.onClose = function () {
    this.emit("disconnect");
};

SocketClient.prototype.onError = function (err) {
    console.error(err);
};

SocketClient.prototype.handleMessage = function (message) {
    switch(message.t) {
        case "s":
            // handle stroke
            return canvasManager.handleStroke(message.d).then(function () {
                // if the stroke assertion passes, share the stroke
                // with other socket clients at this point...
            });
        default:
            // unknown message type
            break;
    }
};

var SocketClientManager = module.exports = function () {
    this.idCounter = 1;
    this.clients = {};
};

SocketClientManager.prototype.handleConnection = function (socket) {
    var self = this;
    var id = this.idCounter++;
    var client = new SocketClient(id, socket);
    this.clients[id] = client;

    client.once("disconnect", function () {
        delete self.clients[id];
    });
};