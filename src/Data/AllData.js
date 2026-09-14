import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const apiValue = createContext();
const BASE_URL = "https://ecommerce-backend-production-6748.up.railway.app";
function AllData({ children }) {
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
  return <apiValue.Provider value={fetchData}>{children}</apiValue.Provider>;
}

export { AllData, apiValue };
