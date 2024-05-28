const express = require('express');
const api = express.Router();

api.get('/', (req, res) => {
    res.json({ message: "Welcome to the API" });
});

api.use('/events', require('./events'));
api.use('/auth', require('./auth'));

module.exports = api;