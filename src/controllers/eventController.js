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
const getActiveEvents = async (req, res) => {
    const result = await Event.find();
    res.json(result.filter(event => event.active));
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

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Event.findByIdAndDelete(id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: "Event not found" });
    }
}

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { active, title, description, button, link, anchor, where, when, img, type } = req.body;

    try {
        const updateFields = {};
        if (active != null) updateFields.active = active;
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (button) updateFields.button = button;
        if (link) updateFields.link = link;
        if (anchor) updateFields.anchor = anchor;
        if (where) updateFields.where = where;
        if (when) updateFields.when = when;
        if (img) updateFields.img = img;
        if (type) updateFields.type = type;

        const result = await Event.findByIdAndUpdate(id, updateFields, { new: true });
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: "Event not found" });
    }
}

module.exports = {
    addEvent,
    getAllEvents,
    getEventById,
    getEventsByBuilding,
    deleteEvent,
    updateEvent,
    getActiveEvents,
}
