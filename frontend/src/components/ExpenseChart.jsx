import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenseChart = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [income, expense],
        backgroundColor: ["#4ade80", "#f87171"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectratio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{
      width: "500px",
      height: "300px",
      margin: "40px auto"
     }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;