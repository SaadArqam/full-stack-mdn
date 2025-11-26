import { useState, useEffect, useCallback } from "react";

const BASE = "http://localhost:3000/";

export const postApi = async (endpoint, body) => {
  const res = await fetch(BASE + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
};

export const getApi = async (endpoint) => {
  const res = await fetch(BASE + endpoint);
  return res.json();
};

export const putApi = async (endpoint, body) => {
  const res = await fetch(BASE + endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
};

export const deleteApi = async (endpoint) => {
  const res = await fetch(BASE + endpoint, { method: "DELETE" });
  return res.json();
};

// ✅ This is the missing hook → Book.jsx requires it
export const useApi = (endpoint) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(BASE + endpoint + "/"); // ensures /book/ request hits correctly
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("API Hook Error:", err);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, refresh: fetchData };
};
