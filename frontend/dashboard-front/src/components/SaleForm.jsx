import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createSale, updateSale } from "../services/saleService";

// Modal Styles
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
  const [quantity, setQuantity] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [flagged, setFlagged] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (saleToEdit) {
      setProductName(saleToEdit.productName);
      setQuantity(saleToEdit.quantity);
      setRevenue(saleToEdit.revenue);
      setRegion(saleToEdit.region);
      setDate(saleToEdit.date);
      setFlagged(saleToEdit.flagged);
      setNotes(saleToEdit.notes);
    }
  }, [saleToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = { productName, quantity, revenue, region, date, flagged, notes };

    if (saleToEdit) {
      await updateSale(saleToEdit.id, saleData);
    } else {
      await createSale(saleData);
    }

    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      style={modalStyles}
      contentLabel="Sale Form"
    >
      <h2>{saleToEdit ? "Edit Sale" : "Add New Sale"}</h2>
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
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <label>Revenue</label>
        <input
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          required
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
        <label>Flagged</label>
        <input
          type="checkbox"
          checked={flagged}
          onChange={(e) => setFlagged(e.target.checked)}
        />
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SaleForm;
