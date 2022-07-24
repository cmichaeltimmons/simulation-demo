'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Serve the client
app.use(express.static(path.join(__dirname, "./", "build")));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);