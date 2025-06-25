import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProjectMonthlyReturnChart = ({ profitCounts = [] }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 14,
            weight: "bold",
            color: "#333",
          },
        },
      },
      title: {
        display: true,
        text: `${
          profitCounts?.length > 0
            ? "Monthly Performance"
            : "No Profits Share Yet"
        } `,
        font: {
          family: "'Poppins', sans-serif",
          weight: "bold",

          size: 20,
        },
        color: "#FF0000",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: (value) => `${value}%`,
          font: {
            family: "'Poppins', sans-serif",
          },
        },
        title: {
          display: true,
          text: "Profit (%)",
        },
      },
    },
  };

  const labels =
    profitCounts?.map(
      (profit) => `${profit?.profitGiveMonths} ${profit?.profitGiveYear}`
    ) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Profit",
        data: profitCounts?.map((profit) => profit?.percentageOfProfit) || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 0.7)",
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <div className="w-full h-[250px] md:h-[380px] p-3 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg shadow-lg mt-2">
      <div className="w-full h-full">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ProjectMonthlyReturnChart;
