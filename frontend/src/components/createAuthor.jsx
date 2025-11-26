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

        const result=await postApi("author/add",{
            first_name:formData.first_name,
            family_name:formData.family_name,
            date_of_birth:formData.dob,
            date_of_death:formData.dod,
        })
        console.log(result)
        AudioListener("Authir added successfully!!!")
    }
    
  return (
    <>
    <div style={{color:"white"}}>
        <h1>Add an Author</h1>
        <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input name='first_name' type='text' placeholder='Enter the first name of the author' onChange={handleChange}/>
            <br />
            <label>Family Name</label>
            <input name='family_name' type='text' placeholder='Enter the family name of the author' onChange={handleChange} />
            <br />
            <label>Date of Birth</label>
            <input name='dob' type='text' placeholder='Enter the dob of the author' onChange={handleChange} />
            <br />
            <label>Date of Birth</label>
            <input name='dod' type='text' placeholder='Enter the dod of the author' onChange={handleChange} />
            <br />
            <button type="submit">Add Author</button>
        </form>
    </div>
    </>
  )
}

export default CreateAuthor
