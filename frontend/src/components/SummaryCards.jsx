/**
 * SummaryCards - Balance, Income, and Expense totals
 * Receives computed totals from App
 */
import React from 'react';
import './SummaryCards.css';

function SummaryCards({ balance, income, expense }) {
  return (
    <section className="summary-cards" aria-label="Summary">
      <div className="summary-card summary-card--balance">
        <span className="summary-card__label">Balance</span>
        <span className="summary-card__value summary-card__value--balance">
          ₹{(balance ?? 0).toFixed(2)}
        </span>
      </div>
      <div className="summary-card summary-card--income">
        <span className="summary-card__label">Income</span>
        <span className="summary-card__value summary-card__value--income">
          +₹{(income ?? 0).toFixed(2)}
        </span>
      </div>
      <div className="summary-card summary-card--expense">
        <span className="summary-card__label">Expense</span>
        <span className="summary-card__value summary-card__value--expense">
          -₹{(expense ?? 0).toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export default SummaryCards;
