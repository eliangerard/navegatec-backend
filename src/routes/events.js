const express = require('express');
const { getAllEvents, addEvent, getEventById, getEventsByBuilding, deleteEvent, updateEvent, getActiveEvents } = require('../controllers/eventController');
const verifySession = require('../middlewares/verifySession');

const events = express.Router();

events.get('/', getActiveEvents);
events.get('/all', verifySession, getAllEvents);
events.get('/:id', getEventById);
events.get('/building/:id', getEventsByBuilding);

events.post('/', verifySession, addEvent);

events.delete('/:id', verifySession, deleteEvent);

events.patch('/:id', verifySession, updateEvent);

module.exports = events;