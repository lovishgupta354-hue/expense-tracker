# Expense Tracker - Full Stack Web Application

A beginner-friendly expense tracker with a React frontend and Node.js/Express backend, using PostgreSQL for storage.

## Features

- **Dashboard**: Balance, total income, and total expense summary cards
- **Add transaction**: Title, amount, category, type (income/expense), and date
- **Transaction list**: View all transactions; income in green, expense in red
- **Delete transaction**: Remove any transaction with one click
- **Responsive UI**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript (Vite)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL

## Project Structure

```
expense-tracker/
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers (MVC)
│   ├── models/       # Database operations
│   ├── routes/       # API routes
│   ├── server.js     # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # API service (axios)
│   │   ├── components/    # Header, SummaryCards, AddTransactionForm, TransactionList
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v18 or later)
- **PostgreSQL** installed and running (or use a cloud DB)

## Setup

### 1. Database (PostgreSQL)

Create a database named `expense_tracker`:

```bash
# Using psql or pgAdmin
CREATE DATABASE expense_tracker;
```

Optional: copy `.env.example` to `.env` in the `backend` folder and set your database credentials:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
DB_USER=postgres
DB_PASSWORD=your_password
```

If you don't create `.env`, the app uses defaults (localhost, user `postgres`, password `postgres`). The `transactions` table is created automatically when the server starts.

### 2. Backend

```bash
cd backend
npm install
npm start
```

Server runs at **http://localhost:5000**. API base: `http://localhost:5000/api`.

### 3. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000** and proxies `/api` requests to the backend.

## API Endpoints

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /api/transactions      | Get all transactions   |
| POST   | /api/transactions      | Create a transaction   |
| DELETE | /api/transactions/:id  | Delete a transaction   |

**POST body example:**

```json
{
  "title": "Salary",
  "amount": 3000,
  "category": "Salary",
  "type": "income",
  "date": "2025-03-08"
}
```

## Running the App

1. Start PostgreSQL and ensure the database exists.
2. Start the backend: `cd backend && npm start`
3. Start the frontend: `cd frontend && npm run dev`
4. Open **http://localhost:3000** in your browser.

---

Built with React (functional components, `useState`, `useEffect`), axios, Express, and PostgreSQL.
