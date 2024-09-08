const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,default:"",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type:String,default:"",
        required: true
    },
    incomeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    month: {
        type: String, default:" ",
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
