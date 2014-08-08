# CanvasServer?  What is this, really?
Currently, this is a bit of an idea playground around a shared, server-side canvas object.

There are components in the "common" directory that will be shared between client (browser) and server.

# Why?
For fun, for education, ... for the children.

## Getting Started

### Installing
Clone project and install dependencies:

    $ git clone <<repo>>
    $ npm install

### Running
Simply execute the "main.js" in the project root:

    $ node main.js
    Started Canvas Server on port 8080.

### Testing
In a browser, simply create a new WebSocket connection to localhost:8080 and send() some dummy data:

    var ws = new WebSocket("ws://localhost:8080");
    ws.addEventListener("open", function () {console.log("Connected!")});
    ws.send(JSON.stringify({t:"s",d:{b:"path", subPaths:[[2,2],[3,3]]}}));

# License

(The MIT License)

Copyright (c) 2014 Robert E. Yawn <reyawn@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.