const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
        required: true
    },
    link: {
        type: String,
        required: true
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