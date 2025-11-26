import React from 'react'
import { postApi } from '../api/Api'
import { useState } from 'react'

const CreateAuthor = () => {
    const[formData,setFormData]=useState({
        first_name:"",
        family_name:"",
        date_of_birth:"",
        date_of_death:""
    });
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const result = await postApi("author/add", formData);

if (result.id) {
      alert("Author added successfully!");
      setFormData({ first_name: "", family_name: "", date_of_birth: "", date_of_death: "" });
    } else {
      alert("Error adding author: " + result.message);
    }

    console.log(result);
    }
    
  return (
    <div style={{ color: "white" }}>
      <h1>Add an Author</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name='first_name'
          type='text'
          placeholder='Enter the first name of the author'
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Family Name</label>
        <input
          name='family_name'
          type='text'
          placeholder='Enter the family name of the author'
          value={formData.family_name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Date of Birth</label>
        <input
          name='date_of_birth'
          type='date'
          value={formData.date_of_birth}
          onChange={handleChange}
        />
        <br />
        <label>Date of Death</label>
        <input
          name='date_of_death'
          type='date'
          value={formData.date_of_death}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Author</button>
      </form>
    </div>
  )};

export default CreateAuthor
