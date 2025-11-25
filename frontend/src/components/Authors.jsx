import React, { useEffect } from "react";
import { useApi } from "../api/Api.jsx";

const Author = () => {
  const { data, refresh } = useApi("author");

  useEffect(() => {
    console.log("Authors response:", data);
  }, [data]);

  return (
    <div style={{ color: "white" }}>
      <h1>All Authors</h1>
      <button onClick={refresh}>Refresh</button>

      {!data ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No authors found</p>
      ) : (
        data.map((author) => (
          <h3 key={author.id}>
            {author.first_name} {author.family_name}
          </h3>
        ))
      )}
    </div>
  );
};

export default Author;
