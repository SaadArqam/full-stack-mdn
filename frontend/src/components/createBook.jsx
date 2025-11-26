import React, { useState, useEffect } from "react";
import { postApi, getApi } from "../api/Api";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    isbn: "",
    authorName: "",
    genreIds: [], // store selected genre IDs
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch authors and genres on mount
  useEffect(() => {
    getApi("author").then(setAuthors);
    getApi("genre").then(setGenres);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "genreIds") {
      let newGenreIds = [...formData.genreIds];
      const id = Number(value);
      if (checked) {
        newGenreIds.push(id);
      } else {
        newGenreIds = newGenreIds.filter((g) => g !== id);
      }
      setFormData({ ...formData, genreIds: newGenreIds });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.genreIds.length) {
      alert("Select at least one genre");
      return;
    }

    const result = await postApi("book/add", formData);

    if (result.id) {
      alert("Book added successfully!");
      setFormData({ title: "", summary: "", isbn: "", authorName: "", genreIds: [] });
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

        {/* Author selection */}
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

        {/* Genre checkboxes */}
        <div>
          <p>Select Genres:</p>
          {genres.map((g) => (
            <label key={g.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="genreIds"
                value={g.id}
                checked={formData.genreIds.includes(g.id)}
                onChange={handleChange}
              />
              {g.name}
            </label>
          ))}
        </div>

        <button type="submit" className="border p-2 mt-2">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
