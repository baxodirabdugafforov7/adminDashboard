import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SaleTable from "./SaleTable";
import SaleForm from "./SaleForm";

const Dashboard = ({onLogout}) => {
    const [sales, setSales] = useState([]);
    const [saleToEdit, setSaleToEdit] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [chartData, setChartData] = useState(null);
    const navigate = useNavigate();

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get("http://localhost:8080/api/sales", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSales(response.data);
            updateChartData(response.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Failed to fetch sales:", err);
            }
        }
    };

    const deleteSaleById = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/sales/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.error("Failed to delete sale:", err);
        }
    };

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
        fetchSales();
    }, []);

    const handleEdit = (sale) => {
        setSaleToEdit(sale);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteSaleById(id);
        const updatedSales = sales.filter((sale) => sale.id !== id);
        setSales(updatedSales);
        updateChartData(updatedSales);
    };

    const handleFormSubmit = () => {
        setFormVisible(false);
        setSaleToEdit(null);
        fetchSales();
    };

    const handleFormCancel = () => {
        setFormVisible(false);
        setSaleToEdit(null);
    };

    return (
        <div className="dashboard" style={{ padding: "20px" }}>
            {/* Header with Logout */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ margin: 0 }}>Business Analytics Dashboard</h1>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button
                    onClick={() => setFormVisible(true)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Add Sale
                </button>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Reload Charts
                </button>

                <button
                    onClick={onLogout} // Just switch view without clearing token
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>


            </div>

            {/* Sale Form Modal */}
            <SaleForm
                saleToEdit={saleToEdit}
                isOpen={isFormVisible}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
            />

            {/* Sales Table */}
            <SaleTable sales={sales} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );

};

export default Dashboard;
