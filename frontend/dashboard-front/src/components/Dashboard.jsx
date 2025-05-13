import React, { useState, useEffect } from "react";
import { getAllSales, deleteSale } from "../services/saleService";
import SaleTable from "./SaleTable";
import SaleForm from "./SaleForm";
import ChartComponent from "./ChartComponent";
import HorizontalBarChart from "./HorizontalBarChart";

const Dashboard = () => {
    const [sales, setSales] = useState([]);
    const [saleToEdit, setSaleToEdit] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [chartData, setChartData] = useState(null); // State for chart data

    // Fetch sales data and update chart data
    const fetchSales = async () => {
        const data = await getAllSales();
        setSales(data); // Update the sales state
        updateChartData(data); // Update the chart data with the latest sales
    };

    // This updates chart data based on sales data
    const updateChartData = (data) => {
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
    };

    useEffect(() => {
        fetchSales(); // Fetch data when component is mounted
    }, []); // Only fetch data once when the component is mounted

    const handleEdit = (sale) => {
        setSaleToEdit(sale);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteSale(id);
        const updatedSales = sales.filter((sale) => sale.id !== id);
        setSales(updatedSales); // Update sales state after deletion
        updateChartData(updatedSales); // Recalculate chart data after deletion
    };

    const handleFormSubmit = () => {
        setFormVisible(false);
        setSaleToEdit(null);
        fetchSales(); // Refetch sales data to update everything (after adding or editing sale)
    };

    const handleFormCancel = () => {
        setFormVisible(false);
        setSaleToEdit(null);
    };

    // Handle the click event for the Update Charts button to refresh the page
    const handleUpdateCharts = () => {
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="dashboard">
            <h1>Business Analytics Dashboard</h1>
            <button onClick={() => setFormVisible(true)} className="add-sale-button">
                Add Sale
            </button>
            <button onClick={handleUpdateCharts} className="update-charts-button">
                Update Charts
            </button>

            <SaleForm
                saleToEdit={saleToEdit}
                isOpen={isFormVisible}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
            />

            <SaleTable
                sales={sales}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

    
        </div>
    );
};

export default Dashboard;
