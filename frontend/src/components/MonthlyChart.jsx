import React from "react";
import { Bar } from "react-chartjs-2";

const MonthlyChart = ({ transactions }) => {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyTotals = new Array(12).fill(0);

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.getMonth();

    if (t.type === "expense") {
      monthlyTotals[month] += parseFloat(t.amount);
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyTotals,
        backgroundColor: "rgba(255,99,132,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;