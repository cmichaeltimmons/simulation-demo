'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json())

const staticPath = express.static(path.join(__dirname, "./client", "build"), {
    setHeaders: function(res, path) {
        res.set("Cross-Origin-Opener-Policy", "same-origin");
        res.set("Cross-Origin-Embedder-Policy", "require-corp");
      }
})
app.use(staticPath);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);