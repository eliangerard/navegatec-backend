const express = require('express');
const { getAllEvents, addEvent, getEventById, getEventsByBuilding } = require('../controllers/eventController');

const events = express.Router();

events.get('/', getAllEvents);
events.get('/:id', getEventById);
events.get('/building/:building', getEventsByBuilding);

events.post('/', addEvent);



module.exports = events;