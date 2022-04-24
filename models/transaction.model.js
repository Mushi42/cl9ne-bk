const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: {
        name: String,
        phone: String,
        email: String
    },
    receiver: {
        name: String,
        phone: String,
        country: String,
        accNumber: String,
        IBAN: String,
        amount: String
    },
    transactionType: {
        type: String
    },
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

const TRANSACTIONS = mongoose.model('transactions', transactionSchema);
module.exports = TRANSACTIONS;