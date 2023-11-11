const routes = require('../routes/index');
const express = require('express');
const httpError = require('http-errors');
const app = express();
app.use('/api/', routes);
app.use((req, res, next) => {
    const err = new httpError(404)
    return next(err);
});

module.exports = app;