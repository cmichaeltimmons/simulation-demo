'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const addon = require('bindings')('addon.node')
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))

// Api

app.post('/api/run-simulations', (req, res) => {
    const result = addon.runGameSimulations(req.body.hero, req.body.villian);
    res.json({
      hero: result.heroWins,
      villian: result.villianWins
    })
});

// Serve the client
app.use(express.static(path.join(__dirname, "./client", "build")));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);