import React, { useState, useEffect } from "react";
import { getApi } from "../api/Api.jsx";

const Book = () => {
  const [data, setData] = useState(null); // ✅ local state for books
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    const books = await getApi("book"); // ✅ calls GET /book/
    setData(books);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1>All Books</h1>
      <button onClick={fetchBooks}>Refresh</button>

      {loading && <p>Loading...</p>}

      {!loading && data?.length === 0 && <p>No books found</p>}

      {!loading &&
        data?.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>
              Author: {book.author.first_name} {book.author.family_name}
            </p>
            <p>Genre: {book.genres.map((g) => g.name).join(", ")}</p>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default Book;
