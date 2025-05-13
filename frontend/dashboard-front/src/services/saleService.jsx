import axios from "axios";

// The base URL for your API
const API_URL = "http://localhost:8081/api/sales";

// Get all sales
export const getAllSales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error;
  }
};

// Create a new sale
export const createSale = async (sale) => {
  try {
    const response = await axios.post(API_URL, sale);
    return response.data;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw error;
  }
};

// Update an existing sale
export const updateSale = async (id, updatedSale) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedSale);
    return response.data;
  } catch (error) {
    console.error("Error updating sale:", error);
    throw error;
  }
};

// Delete a sale
export const deleteSale = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw error;
  }
};
