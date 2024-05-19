const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    button: {
        type: String,
    },
    link: {
        type: String,
    },
    anchor: {
        type: [Number],
        required: true
    },
    where: {
        type: Object,
        required: true
    },
    when: {
        type: Date,
        default: new Date()
    },
    img: {
        type: String,
    },
    type: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;