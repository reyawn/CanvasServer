var managerInits = {
    CanvasManager: function () {
        var CanvasManager = require("./common/CanvasManager");
        return new CanvasManager();
    },
    SocketClientManager: function () {
        var SocketClientManager = require("./SocketClientManager");
        return new SocketClientManager();
    }
};

var managers = {};

function stageGetter(n) {
    module.exports["get" + n] = function () {
        if (n in managerInits) {
            managers[n] = managerInits[n]();
            delete managerInits[n];
        }
        return managers[n];
    }
}

for(var n in managerInits) {
    stageGetter(n);
}