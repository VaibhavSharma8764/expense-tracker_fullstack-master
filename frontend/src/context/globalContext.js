import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "https://expense-tracker-fullstack-master.onrender.com";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // INCOMES
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  // EXPENSES
  const addExpense = async (expenseData) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expenseData);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    return history
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
