import React, { useState, useEffect } from "react";
import { postApi, getApi } from "../api/Api";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    isbn: "",
    authorName: "",
    genreName: "", // single genre
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch authors and genres on mount
  useEffect(() => {
    getApi("author").then(setAuthors);
    getApi("genre").then(setGenres);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.summary || !formData.isbn || !formData.authorName || !formData.genreName) {
      alert("All fields are required!");
      return;
    }

    const result = await postApi("book/add", formData);

    if (result.id) {
      alert("Book added successfully!");
      setFormData({ title: "", summary: "", isbn: "", authorName: "", genreName: "" });
    } else {
      alert("Error adding book: " + result.message);
    }

    console.log(result);
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Add New Book</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
        <input
          placeholder="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />

        {/* Author input */}
        <input
          list="authors"
          placeholder="Select or add Author"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          required
        />
        <datalist id="authors">
          {authors.map((a) => (
            <option key={a.id} value={`${a.first_name} ${a.family_name}`} />
          ))}
        </datalist>

        {/* Genre input */}
        <input
          list="genres"
          placeholder="Select or add Genre"
          name="genreName"
          value={formData.genreName}
          onChange={handleChange}
          required
        />
        <datalist id="genres">
          {genres.map((g) => (
            <option key={g.id} value={g.name} />
          ))}
        </datalist>

        <button type="submit" className="border p-2 mt-2">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
