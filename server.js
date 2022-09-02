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
app.use(bodyParser.json())

// Api

app.post('/api/run-simulations', async (req, res) => {
    const result = await addon.runGameSimulations(req.body.hero, req.body.villian);
    res.json({
      hero: result.heroWins,
      villian: result.villianWins
    })
});

// Serve the client
app.use(express.static(path.join(__dirname, "./client", "build")));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);