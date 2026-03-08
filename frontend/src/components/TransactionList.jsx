/**
 * TransactionList - Lists all transactions with delete button
 * Green for income, red for expense
 */
import React from 'react';
import './TransactionList.css';

function TransactionList({ transactions, onDelete, loading }) {
  if (loading) {
    return (
      <section className="transaction-list">
        <h2 className="transaction-list__title">Transactions</h2>
        <p className="transaction-list__empty">Loading...</p>
      </section>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <section className="transaction-list">
        <h2 className="transaction-list__title">Transactions</h2>
        <p className="transaction-list__empty">No transactions yet. Add one above!</p>
      </section>
    );
  }

  return (
    <section className="transaction-list" aria-label="Transaction list">
      <h2 className="transaction-list__title">Transactions</h2>
      <ul className="transaction-list__list">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`transaction-item transaction-item--${t.type}`}
          >
            <div className="transaction-item__info">
              <span className="transaction-item__title">{t.title}</span>
              <span className="transaction-item__meta">
                {t.category} • {new Date(t.date).toLocaleDateString()}
              </span>
            </div>
            <div className="transaction-item__right">
              <span className="transaction-item__amount">
                {t.type === 'income' ? '+' : '-'}₹{Math.abs(parseFloat(t.amount)).toFixed(2)}
              </span>
              <button
              type="button"
              className="transaction-item__delete"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this transaction?")) {
               onDelete(t.id);
            }
           }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TransactionList;
