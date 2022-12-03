const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    cin: {
        type: Number,
    },
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    classe: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    }
});

exports.User = mongoose.model('User', userSchema);