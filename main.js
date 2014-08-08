var CanvasServer = require("./CanvasServer");
var canvasServer = new CanvasServer();
canvasServer.start().done(function () {
    console.log("Started Canvas Server on port " + canvasServer.port + ".");
})