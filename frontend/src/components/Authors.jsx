import React, { useEffect, useState } from "react";
import { getApi } from "../api/Api";

const Author = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    const data = await getApi("author");
    setAuthors(data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1>All Authors</h1>
      <button onClick={fetchAuthors}>Refresh</button>

      {authors.length === 0 ? (
        <p>No authors found</p>
      ) : (
        authors.map((author) => (
          <h3 key={author.id}>
            {author.first_name} {author.family_name}
          </h3>
        ))
      )}
    </div>
  );
};

export default Author;
