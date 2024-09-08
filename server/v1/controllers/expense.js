const Expense = require('../../models/expense');
const Income = require('../../models/income');
const Category = require('../../models/category');
const mongoose = require('mongoose')
// Add Expense
const ObjectId =  mongoose.Types.ObjectId
exports.addExpense = async (req, res) => {
    const { title, amount, category, date, month, year, income_Id } = req.body;

    try {
        // Find the income record for the logged-in user with the specific month and year
        const incomeRecord = await Income.findOne({
            // user: req.user._id,  
            // month: month,
            // year: year
            $or: [
                { user: req.user._id },
                { month: month },
                { year: year }
            ]
        });

        // Debugging
        console.log('incomeRecord: ', incomeRecord);

        // Check if income record exists for the specific month and year
        if (!incomeRecord) {
            return res.status(400).json({ message: "No income record found for this month." });
        }

        // Check if the month is locked
        if (incomeRecord.isLocked) {
            return res.status(400).json({ message: "Cannot add expenses for a locked month." });
        }

        // Check if income is sufficient
        if (incomeRecord.income <= 0) {
            return res.status(400).json({ message: "Income is very low. Cannot add expense." });
        }

        // Create the new expense
        const expense = new Expense({
            user: req.user._id,
            title,
            amount,
            category,
            incomeId: incomeRecord._id,  // Link to the correct income record
            date,
            month,
            year
        });

        // Deduct the expense amount from the income
        incomeRecord.income -= amount;

        // Save both expense and updated income record
        await expense.save();
        await incomeRecord.save();

        // Return the newly created expense
        return res.status(201).json(expense);

    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: error.message });
    }
};


// Edit Expense
exports.editExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    try {
        const expense = await Expense.findById(id);
        console.log('expense: ', expense); 
        if (!expense) {
            return res.status(404).json({ message: "Expense not found." });
        }

        if (expense.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized." });
        }

        // Update income if the amount changes
        const incomeRecord = await Income.findOne({ user: req.user._id, month: expense.month, year: expense.year });
        if (incomeRecord && !incomeRecord.isLocked) {
            incomeRecord.income += expense.amount - amount; // Adjust income
            await incomeRecord.save();
        }

        expense.title = title || expense.title;
        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.date = date || expense.date;

        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found." });
        }

        if (expense.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized." });
        }

        const incomeRecord = await Income.findOne({ user: req.user._id, month: expense.month, year: expense.year });
        if (incomeRecord && !incomeRecord.isLocked) {
            incomeRecord.income += expense.amount; // Refund income
            await incomeRecord.save();
        }

        await expense.remove();
        res.status(200).json({ message: "Expense deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Category
// exports.addCategory = async (req, res) => {
//     const { name } = req.body;

//     try {
//         const category = new Category({
//             name,
//             user: req.user._id
//         });

//         await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getExpense = async(req,res)=>{
    try {
        const expense = await Expense.find({user: new  ObjectId( req.user._id)});
        if(!expense){
           return res.status(404).json({ message: "No expense record found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}