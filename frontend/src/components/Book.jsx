
import React from 'react'
import Api from '../api/Api';

const Book = () => {
    const data=Api("book")
  return (
    <div style={{ color: "white" }}
>
        <h1>All Books</h1>
        {
        !data?(
            <p>Loading...</p>
        ):(
            data.map((book) => <h3 key={book.id}>{book.title}</h3>)
        )
        }
    </div>
  )
}

export default Book
