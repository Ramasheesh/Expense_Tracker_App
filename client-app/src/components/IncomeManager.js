import React, { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import "../styles/Income.css";
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/authService'; 
import useAuth from '../hooks/useAuth'; 

const IncomeManager = () => {
    const [formData, setFormData] = useState({
        month: "",
        year: "",
        income: ""
    });
    const [isLocked, setIsLocked] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const { isAuthenticated,  } = useAuth();
    const { addIncome, getIncome, updateIncome, deleteIncome } = useContext(AuthContext);

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
            fetchIncomes();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const fetchIncomes = async () => {
        try {
            const data = await getIncome(); 
            setIncomes(data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value  } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAddIncome = async () => {
        // Validate inputs
        const { month, year, income } = formData;
        
        if (!month || !year || !income) {
          alert("All fields are required.");
          return;
        }
    
        const parsedIncome = parseFloat(income);
        
        if (isNaN(parsedIncome)) {
          alert("Income must be a valid number.");
          return;
        }
    
        try {
          const newIncome = await addIncome(parsedIncome, month, year);
          setIncomes([...incomes, newIncome]);
          resetForm();
        } catch (error) {
          console.error('Error adding income:', error);
        }
      };
    
    const handleUpdateIncome = async (id) => {
       
        try {
            const updatedIncome = { ...formData, id };
            const data = await updateIncome(updatedIncome); // Update income using context method
            setIncomes(incomes.map(inc => (inc.id === id ? data : inc)));
            resetForm();
        } catch (error) {
            console.error('Error updating income:', error);
        }


    };

    const handleDeleteIncome = async (id) => {
        try {
            await deleteIncome(id); 
            setIncomes(incomes.filter(inc => inc.id !== id));
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };
    
    const handleLockMonth = async (month, year) => {
        try {
            const data = await authService.lockIncome({ month, year }); // Lock income through authService
            setIncomes(incomes.map(inc => (inc.month === month && inc.year === year ? data : inc)));
            setIsLocked(true);
        } catch (error) {
            console.error('Error locking month:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            month: '',
            year: '',
            income: ''
        });
        setIsLocked(false);
    };
  
    return (
        <div className="income-manager">
            <animated.div style={fade}>
                <h2>Manage Your Income</h2>
            </animated.div>

            <animated.div style={slideIn}>
                <div className="income-form">
                    <div className="form-group">
                        <label htmlFor="month">Month:</label>
                        <input
                            type="text"
                            id="month"
                            name="month"
                            placeholder="Month"
                            value={formData.month}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year:</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            placeholder="Year"
                            value={formData.year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="income">Income:</label>
                        <input
                            type="number"
                            id="income"
                            name="income"
                            placeholder="Income"
                            value={formData.income}
                            onChange={handleInputChange}
                            disabled={isLocked}
                        />
                    </div>
                    <div className="form-buttons" style={{margin:"auto", justifyContent:"space-between"}}>
                        <button onClick={handleAddIncome} disabled={isLocked}>
                            Add Income
                        </button>
                        <button onClick={fetchIncomes}>
                            Get Income
                        </button>
                    </div>
                </div>
            </animated.div>

            <div className="income-list">
                {incomes.map(inc => (
                    <animated.div style={slideIn} key={inc.id} className="income-item">
                        <div className="income-details">
                            <p>{`Month: ${inc.month}, Year: ${inc.year} - Income: $${inc.income}`}</p>
                            {inc.isLocked ? (
                                <p>Month Locked</p>
                            ) : (
                                <div className="income-actions">
                                    <button onClick={() => handleUpdateIncome(inc.id)}>Update</button>
                                    <button onClick={() => handleDeleteIncome(inc.id)}>Delete</button>
                                    <button onClick={() => handleLockMonth(inc.month, inc.year)}>Lock Month</button>
                                </div>
                            )}
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default IncomeManager;
