import React from "react";

const SaleTable = ({ sales, onDelete, onEdit }) => {
  const handleDelete = (id, productName) => {
    if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
      onDelete(id);
    }
  };

  return (
    <table className="sale-table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Revenue</th>
          <th scope="col">Region</th>
          <th scope="col">Date</th>
          <th scope="col">Flagged</th>
          <th scope="col">Notes</th>
          <th scope="col">Actions</th>
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
              <button
                onClick={() => onEdit(sale)}
                className="edit-btn"
                aria-label={`Edit ${sale.productName}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(sale.id, sale.productName)}
                className="delete-btn"
                aria-label={`Delete ${sale.productName}`}
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
