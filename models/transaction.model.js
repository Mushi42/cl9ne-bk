const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: {
    name: String,
    phone: String,
    email: String,
  },
  receiver: {
    name: String,
    phone: String,
    bank: String,
    serviceProvider: String,
    receiverNumber: String,
    IBAN: String,
  },
  transactionType: {
    type: String,
    enum: ['bank', 'mobile'],
  },
  amount: Number,
  convertedAmount: Number,
  currency: String,
  stripeTransactionId: String,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
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