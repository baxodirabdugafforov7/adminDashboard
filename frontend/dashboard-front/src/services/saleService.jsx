import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/sales", // no trailing slash
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // optional: 5 seconds timeout
});

// You can add interceptors here if you want, e.g., for auth tokens or logging
// apiClient.interceptors.request.use(config => { ... });

export const getAllSales = async () => {
  try {
    const response = await apiClient.get(""); // no trailing slash needed
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error; // let the caller handle error
  }
};

export const createSale = async (sale) => {
  try {
    const response = await apiClient.post("", sale);
    return response.data;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw error;
  }
};

export const updateSale = async (id, updatedSale) => {
  try {
    const response = await apiClient.put(`/${id}`, updatedSale);
    return response.data;
  } catch (error) {
    console.error(`Error updating sale with id ${id}:`, error);
    throw error;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting sale with id ${id}:`, error);
    throw error;
  }
};

export default apiClient; // export if you want to use it elsewhere (optional)
