import React from "react";
import { deleteSale } from "../services/saleService";

// Case-insensitive product name check before deletion
const SaleTable = ({ sales, onDelete, onEdit }) => {
  const handleDelete = (id, productName) => {
    const caseInsensitiveCheck = sales.some(
      (sale) => sale.productName.toLowerCase() === productName.toLowerCase()
    );
    if (caseInsensitiveCheck) {
      if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
        onDelete(id);
      }
    }
  };

  return (
    <table className="sale-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Revenue</th>
          <th>Region</th>
          <th>Date</th>
          <th>Flagged</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id}>
            <td>{sale.productName}</td>
            <td>{sale.quantity}</td>
            <td>{sale.revenue}</td>
            <td>{sale.region}</td>
            <td>{sale.date}</td>
            <td>{sale.flagged ? "Yes" : "No"}</td>
            <td>{sale.notes}</td>
            <td>
              <button onClick={() => onEdit(sale)} className="edit-btn">Edit</button>
              <button
                onClick={() => handleDelete(sale.id, sale.productName)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SaleTable;
