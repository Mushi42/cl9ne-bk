const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    accountType: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
});

const USERS = mongoose.model('users', usersSchema);
module.exports = USERS;