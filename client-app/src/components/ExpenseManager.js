import React, { useState, useEffect , useContext} from 'react';
import { useSpring, animated } from 'react-spring';
import { AuthContext } from '../context/AuthContext';
// import useAuth from '../hooks/useAuth';
import  '../styles/ExpenseManager.css';

const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, ] = useState([{ _id: 'shopping', name: 'Shopping' }]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        month: '',
        year: ''
    });
    // const { isAuthenticated, currentUser } = useAuth();
    const [editingExpense, setEditingExpense] = useState(null);
    const { isAuthenticated, getExpenses, addExpense, updateExpense, deleteExpense } = useContext(AuthContext);

    // Spring animations
    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const slideIn = useSpring({
        from: { transform: 'translateY(100px)', opacity: 0 },
        to: { transform: 'translateY(0px)', opacity: 1 }
    });

    useEffect(() => {
        if (isAuthenticated) {
            fetchExpenses();
            // getExpenses();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleAddExpense = async () => {
        const { title, amount, category, date, month, year } = formData;
        // try {
        //     const data = await addExpense(formData);
        //     setExpenses([...expenses, data]);
        //     resetForm();
        // } catch (error) {
        //     console.error('Error adding expense:', error);
        // }
        if (!title || !amount || !category || !date || !month || !year) {
            alert('All fields are required.');
            return;
        }
        // if (!formData.title || !formData.amount || !formData.category || !formData.date) {
        //     alert('All fields are required.');
        //     return;
        // }
        const expenseData = {
            title,  
            amount, 
            category, 
            date, 
            month, 
            year
        };
        try {
            const { data } = await addExpense(expenseData); // Pass the correct data structure
            setExpenses([...expenses, data]);
            resetForm();
        } catch (error) {
            console.error('Error adding expense:', error);
        }
        // try {
        //     const { data } = await addExpense(formData);
        //     setExpenses([...expenses, data]);
        //     resetForm();
        // } catch (error) {
        //     console.error('Error adding expense:', error);
        // }
    };

    const handleEditExpense = (expense) => {
        setFormData(expense);
        setEditingExpense(expense._id);
    };

    const handleUpdateExpense = async () => {
        try {
            const data = await updateExpense(editingExpense, formData);
            setExpenses(expenses.map(exp => (exp._id === editingExpense ? data : exp)));
            resetForm();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(exp => exp._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            amount: '',
            category: '',
            date: '',
            month: '',
            year: ''
        });
        setEditingExpense(null);
    };
    return (
        <div className="expense-manager">
            <animated.div style={fade}>
                <h2>Manage Your Expenses</h2>
            </animated.div>

            <animated.div style={slideIn}>
                <div className="expense-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        {categories.length === 0 && <option value="shopping">Shopping</option>
                        // eslint-disable-next-line no-sequences
                        ,
                        <option value="food">Food</option>} 
                        {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}
                        </option>
                    ))}
                    </select>
                    
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="month"
                        placeholder="Month"
                        value={formData.month}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleInputChange}
                    />
                    {editingExpense ? (
                        <button onClick={handleUpdateExpense}>Update Expense</button>
                    ) : (
                        <button onClick={handleAddExpense}>Add Expense</button>
                    )}
                </div>
            </animated.div>

            <div className="expense-list">
                {expenses.map(exp => (
                    <animated.div style={slideIn} key={exp._id} className="expense-item">
                        <p>{exp.title} - ${exp.amount}</p>
                        <p>{exp.category.name}</p>
                        <p>{exp.date}</p>
                        <button onClick={() => handleEditExpense(exp)}>Edit</button>
                        <button onClick={() => handleDeleteExpense(exp._id)}>Delete</button>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseManager;
