import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to make API calls
  const callApi = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};

export default useApi;