import React, { useState, useEffect } from "react";

const Api = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Renamed the inner async function to avoid name conflict
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, [endpoint]);
  return data
};

export default Api;
