const Event = require("../models/Event");

// anchor: [28.71025950442226, -106.1059886447052],
//     title: "",
//     description: "",
//     button: "",
//     link: "",
//     where: "",
//     when: new Date(),
//     img: "",
//     type: "administrative",

const addEvent = async (req, res) => {
    const { title, description, button, link, anchor, where, when, img, type } = req.body;
    
    const event = new Event({
        title,
        description,
        button,
        link,
        anchor,
        where,
        when,
        img,
        type
    });

    const result = await event.save();
    res.json(result);
}

const getAllEvents = async (req, res) => {
    const result = await Event.find();
    res.json(result);
}

const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Event.findById(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: "Event not found" });
    }

}

const getEventsByBuilding = async (req, res) => {
    const { building } = req.params;

    const result = await Event.find();
    res.json(result);
}

module.exports = {
    addEvent,
    getAllEvents,
    getEventById,
    getEventsByBuilding,
}
