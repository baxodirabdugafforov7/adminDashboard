// SaleForm.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createSale, updateSale } from "../services/saleService";

const modalStyles = {
  content: {
    width: "400px",
    height: "auto",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
};

const SaleForm = ({ saleToEdit, isOpen, onSubmit, onCancel }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("0"); // store as string!
  const [revenue, setRevenue] = useState("0");   // store as string!
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [returned, setReturned] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (saleToEdit) {
      setProductName(saleToEdit.productName || "");
      setQuantity(saleToEdit.quantity !== undefined ? String(saleToEdit.quantity) : "0");
      setRevenue(saleToEdit.revenue !== undefined ? String(saleToEdit.revenue) : "0");
      setRegion(saleToEdit.region || "");
      setDate(saleToEdit.saleDate ? saleToEdit.saleDate.substring(0, 10) : "");
      setReturned(!!saleToEdit.returned);
      setNotes(saleToEdit.notes || "");
      setError(null);
    } else {
      setProductName("");
      setQuantity("0");
      setRevenue("0");
      setRegion("");
      setDate("");
      setReturned(false);
      setNotes("");
      setError(null);
    }
  }, [saleToEdit]);

  // Only allow digits (and empty string) in quantity and revenue inputs
  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setQuantity(val);
  };

  const handleRevenueChange = (e) => {
    const val = e.target.value;
    // Allow digits and decimal point (optional)
    if (/^\d*\.?\d*$/.test(val)) setRevenue(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Convert string inputs to numbers before sending
    const saleData = {
      productName,
      quantity: quantity === "" ? 0 : Number(quantity),
      revenue: revenue === "" ? 0 : Number(revenue),
      region,
      saleDate: date,
      returned,
      notes,
    };

    try {
      if (saleToEdit) {
        await updateSale(saleToEdit.id, saleData);
      } else {
        await createSale(saleData);
      }
      onSubmit();
    } catch (err) {
      setError("Failed to save sale data");
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} style={modalStyles} contentLabel="Sale Form">
      <h2>{saleToEdit ? "Edit Sale" : "Add New Sale"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          required
          min={0}
        />

        <label>Revenue</label>
        <input
          type="number"
          value={revenue}
          onChange={handleRevenueChange}
          required
          min={0}
          step="0.01"
        />

        <label>Region</label>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Returned</label>
        <input
          type="checkbox"
          checked={returned}
          onChange={(e) => setReturned(e.target.checked)}
        />

        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SaleForm;
