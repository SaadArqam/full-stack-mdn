import React, { useState } from "react";
import { postApi } from "../api/Api";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    isbn: "",
    authorId: "",
    genreId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postApi("book/add", {
      title: formData.title,
      summary: formData.summary,
      isbn: formData.isbn,
      authorId: Number(formData.authorId),
      genreId: Number(formData.genreId),
    });

    console.log(result);
    alert("Book added successfully!");
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Add New Book</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <label>Summary</label>
        <input
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
        <br />

        <label>ISBN</label>
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
        <br />

        <label>Author ID</label>
        <input
          type="number"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required
        />
        <br />

        <label>Genre ID</label>
        <input
          type="number"
          name="genreId"
          value={formData.genreId}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
