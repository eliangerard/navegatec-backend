const mongoose = require('mongoose');

const allowedUserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
});

const AllowedUser = mongoose.model('AllowedUser', allowedUserSchema);

module.exports = AllowedUser;