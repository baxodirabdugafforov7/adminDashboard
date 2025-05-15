import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const { data } = await axios.get("http://localhost:8080/api/sales", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productNames = data.map((sale) => sale.productName);
        const quantities = data.map((sale) => sale.quantity);

        setChartData({
          labels: productNames,
          datasets: [
            {
              label: "Quantity Sold",
              data: quantities,
              backgroundColor: "#36A2EB",
              borderRadius: 6,
              barThickness: 20,
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

    fetchSales();
  }, [navigate]);

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Quantity Sold by Product",
      },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="chart-container" style={{ marginTop: "30px" }}>
      <h2>Quantity Sold by Product</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
