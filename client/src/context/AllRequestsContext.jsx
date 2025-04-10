import { createContext, useContext, useState, useEffect } from "react";

const AllRequestsContext = createContext();

export const AllRequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/GetRequests/AllRequests", {
        credentials: "include",
      });
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch maintenance requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(); // Load once on app start
  }, []);

  return (
    <AllRequestsContext.Provider value={{ requests, loading, refreshRequests: fetchRequests }}>
      {children}
    </AllRequestsContext.Provider>
  );
};

export const useAllRequests = () => useContext(AllRequestsContext);