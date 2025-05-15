import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.get("http://localhost:8080/api/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const revenueByRegion = data.reduce((acc, sale) => {
        acc[sale.region] = (acc[sale.region] || 0) + sale.revenue;
        return acc;
      }, {});

      const labels = Object.keys(revenueByRegion);
      const values = Object.values(revenueByRegion);

      setChartData({
        labels,
        datasets: [
          {
            label: "Sales Revenue",
            data: values,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to load sales data");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Revenue by Region (Live)",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Revenue: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="chart-container" style={{ marginTop: "30px" }}>
      <h2>Sales Revenue by Region</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
