const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    currencyCountry: String,
    name: String,
    convertRate: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
});

const CURRENCY = mongoose.model('currency', currencySchema);
module.exports = CURRENCY;