import React, { useState } from "react"
import BookDataService from "../services/BookService"

const AddBook = () => {
  const initialBookState = {
    id: null,
    title: "",
    author: ""
  }
  const [book, setBook] = useState(initialBookState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    const { name, value } = event.target
    setBook({ ...book, [name]: value })
  }

  const saveBook = () => {
    var data = {
      title: book.title,
      author: book.author
    }
    if (window.confirm('Are you sure you wish to add this book?')) {
      BookDataService.create(data)
        .then(response => {
          setBook({
            id: response.data.content.data.id,
            title: response.data.content.data.title,
            author: response.data.content.data.author
          })
          setSubmitted(true)
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const newBook = () => {
    setBook(initialBookState)
    setSubmitted(false)
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <div className="text-end">
            <button className="btn btn-success" onClick={newBook}>
              Add New
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Add Book Detail</h3>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={book.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={book.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>

          <div className="text-end">
            <button
              onClick={saveBook}
              className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBook