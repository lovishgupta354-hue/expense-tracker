/**
 * AddTransactionForm - Form to add income or expense
 * Fields: title, amount, category, date, type (income/expense)
 */
import React, { useState } from 'react';
import './AddTransactionForm.css';

const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Other',
];

function AddTransactionForm({ onTransactionAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [customCategory,setCustomCategory] = useState("");
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num)) {
      setError('Amount must be a number');
      return;
    }
    setLoading(true);
    try {
      await onTransactionAdded({
        title: title.trim(),
        amount: num,
        category: category === "other"?
        customCategory: category,
        type,
        date: date || new Date().toISOString().split('T')[0],
      });
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-form" aria-label="Add transaction">
      <h2 className="add-form__title">Add Transaction</h2>
      <form className="add-form__form" onSubmit={handleSubmit}>
        <div className="add-form__row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="add-form__row">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="add-form__row">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {category === "Other" && (
  <input
    type="text"
    placeholder="Enter custom category (e.g. Grow, Binance)"
    value={customCategory}
    onChange={(e) => setCustomCategory(e.target.value)}
  />
)}
        </div>
        <div className="add-form__row">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="add-form__row">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {error && <p className="add-form__error">{error}</p>}
        <button type="submit" className="add-form__submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </section>
  );
}

export default AddTransactionForm;
