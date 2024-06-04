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
    const { title, description, button, link, anchor, where, when, from, to, img, type } = req.body;
    
    const event = new Event({
        title,
        description,
        button,
        link,
        anchor,
        where,
        when,
        from,
        to,
        img,
        type
    });

    const result = await event.save();
    res.json(result);
}

const editEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, button, link, anchor, where, when, from, to, img, type } = req.body;
    console.log(id, req.body);
    
    await Event.findByIdAndUpdate(id, {
        title,
        description,
        button,
        link,
        anchor,
        where,
        when,
        from,
        to,
        img,
        type
    })
    res.json({ message: "Event updated" });
}

const getAllEvents = async (req, res) => {
    const result = await Event.find();
    res.json(result);
}
const getActiveEvents = async (req, res) => {
    const result = await Event.find();
    res.json(result.filter(event => event.active && (event.from ? event.from >= new Date() : true) && (event.to ? event.to >= new Date() : true)));
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
    const { id } = req.params;

    const result = await Event.find({ active: true, "where.id": parseInt(id) });
    res.json(result.filter(event => event.active && (event.from ? event.from >= new Date() : true) && (event.to ? event.to >= new Date() : true)));
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
    editEvent,
    getAllEvents,
    getEventById,
    getEventsByBuilding,
    deleteEvent,
    updateEvent,
    getActiveEvents,
}
