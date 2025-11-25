import { useState, useEffect } from "react";

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, refresh: fetchData };
};

export const postApi = async (endpoint, body) => {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
};
