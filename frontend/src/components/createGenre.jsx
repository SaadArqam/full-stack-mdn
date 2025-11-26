import React, { useState, useEffect } from "react";
import { postApi, getApi } from "../api/Api";

const CreateGenre = () => {
      const [formData, setFormData] = useState({
        name: "",
      });
 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const result = await postApi("genre/add", formData);
  
      if (result.id) {
        alert("Genre added successfully!");
        setFormData({ name:""});
      } else {
        alert("Error adding genre: " + result.message);
      }
  
      console.log(result);
    };
  return (
    <div className="p-4 min-h-screen bg-black text-white">
        <h1>Create new Genre</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <button type="submit" className="border p-2">Add Genre</button>
    </form>
      
    </div>
  )
}

export default CreateGenre
