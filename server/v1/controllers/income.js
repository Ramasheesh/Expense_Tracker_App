const Income = require('../../models/income');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId
// Add Income
const addIncome = async (req, res) => {
    const { month, year, income } = req.body;

    try {
        let incomeRecord = await Income.findOne({ user: req.user._id, month, year });

        if (incomeRecord && incomeRecord.isLocked) {
            return res.status(400).json({ message: "Income for this month is locked." });
        }

        if (incomeRecord) {
            incomeRecord.income += income;
            await incomeRecord.save();
        } else {
            incomeRecord = new Income({
                user: req.user._id,
                month,
                year,
                income
            });
            await incomeRecord.save();
        }

        res.status(201).json(incomeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const lockMonth = async (req, res) => {
    const { month, year } = req.body;

    try {
        const incomeRecord = await Income.findOne({ 
            $or: [
            { user: req.user._id },
            { month: month },
            { year: year }
           ]
        });

        if (!incomeRecord) {
            return res.status(404).json({ message: "Income record not found." });
        }

        if (incomeRecord.isLocked) {
            // console.log('ncomeRecord.isLocked == true: ', incomeRecord.isLocked);
            return res.status(400).json({ message: "This month is already locked." });
        }

        incomeRecord.isLocked = true;
        await incomeRecord.save();

        res.status(200).json(incomeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getIncome = async (req, res) => {
    const { month, year } = req.body;
    try {
        const incomeRecord = await Income.find({ user: req.user._id || month || year});
        if (!incomeRecord) {
            return res.status(404).json({ message: "Income record not found." });
        }
        res.status(200).json(incomeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateIncome = async (req, res) => {
    const { month, year , income } = req.body;

    try {
        const incomeRecord = await Income.findOneAndUpdate(
            {
                $or: [
                    { user: req.user._id }, 
                    { month: month }, 
                    { year: year }
                ]
            },
            { $set: { income } },
            { new: true } 
        );
        if (!incomeRecord) {
            return res.status(404).json({ message: "Income record not found." });
        }

        res.status(200).json(incomeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteIncome = async (req, res) => {
    const { month, year } = req.body;
    try {
        const deletedIncome = await Income.findOneAndDelete({
            $or: [
                { user: req.user._id },
                { month: month },
                { year: year }
            ]
        });
        if (!deletedIncome) {
            return res.status(404).json({ message: "Income record not found." });
        }
        res.status(200).json({ message: "Income record deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    lockMonth:lockMonth,
    addIncome, getIncome , updateIncome , deleteIncome
}