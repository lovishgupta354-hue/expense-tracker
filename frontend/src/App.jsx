/**
 * App - Main dashboard layout
 * Fetches transactions, computes totals, and passes data to components
 */
const password = prompt("Enter password to access the dashboard:");
if (password !== "123456") {
  document.body.innerHTML = "<h1>Access Denied</h1>";
}
import MonthlyChart from "./components/MonthlyChart";
import ExpenseChart from "./components/ExpenseChart";
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import { transactionApi } from './api/transactionApi';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions on mount
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await transactionApi.getAll();
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Compute totals from transactions
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const handleTransactionAdded = async (data) => {
    const res = await transactionApi.create(data);
    setTransactions((prev) => [res.data, ...prev]);
  };

  const handleDelete = async (id) => {
    await transactionApi.delete(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };
  const downloadCSV = () => {
  if (!transactions.length) {
    alert("No transactions to download");
    return;
  }

  const headers = ["Title,Amount,Category,Type,Date"];

  const rows = transactions.map((t) =>
    `${t.title},${t.amount},${t.category},${t.type},${t.date}`
  );

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "expense-report.csv";
  a.click();

  window.URL.revokeObjectURL(url);
};

  return (
    <div className="app">
      <Header />
      <main className="dashboard">
        <SummaryCards

          balance={balance}
          income={totalIncome}
          expense={totalExpense}
        />
    
        <ExpenseChart income={totalIncome}
        expense={totalExpense} />
        
        <div className="dashboard__content">
          <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
            loading={loading}
          />

        </div>
        <MonthlyChart transactions={transactions} />

        <button
         onClick={downloadCSV}
         style={{
          display: "inline-block",
          margin: "30px auto",
          padding: "12px 25px",
          borderRadius: "8px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer",
          fontSize: "16px"
}}
>
Download Expense Report
</button>

               
      </main>
    </div>
  );
}

export default App;
