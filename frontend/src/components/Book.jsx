import React from "react";
import { useApi } from "../api/Api.jsx";

const Book = () => {
  const { data, refresh } = useApi("book");

  return (
    <div style={{ color: "white" }}>
      <h1>All Books</h1>
      <button onClick={refresh}>Refresh</button>

      {!data ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No books found</p>
      ) : (
        data.map((book) => <h3 key={book.id}>{book.title}</h3>)
      )}
    </div>
  );
};

export default Book;
