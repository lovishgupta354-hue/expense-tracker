/**
 * Header - App title and branding
 */
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">FinTrack</h1>
      <p className="header__subtitle">Track your income and expenses</p>
    </header>
  );
}

export default Header;
