import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SalesChart = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await fetch("http://localhost:8080/sales");
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
    }
  };

  const addSale = async () => {
    const newSale = {
      productName: "Product " + Math.floor(Math.random() * 100),
      quantitySold: Math.floor(Math.random() * 100),
      revenue: Math.floor(Math.random() * 1000),
    };

    try {
      await fetch("http://localhost:8080/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSale),
      });
      fetchSales(); // refresh chart
    } catch (error) {
      console.error("Failed to add sale:", error);
    }
  };

  const barChartData = {
    labels: sales.map((s) => s.productName),
    datasets: [
      {
        label: "Revenue",
        data: sales.map((s) => s.revenue),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: sales.map((s) => s.productName),
    datasets: [
      {
        label: "Quantity Sold",
        data: sales.map((s) => s.quantitySold),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Sales Charts</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ width: "500px" }}>
          <Bar data={barChartData} />
        </div>
        <div style={{ width: "400px" }}>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={addSale} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
          Add Sale
        </button>
        <button onClick={fetchSales} style={{ padding: "0.5rem 1rem" }}>
          Update Chart
        </button>
      </div>
    </div>
  );
};

export default SalesChart;
