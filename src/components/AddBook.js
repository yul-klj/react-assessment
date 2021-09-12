import React, { useState } from "react"
import BookDataService from "../services/BookService"

const AddBook = props => {
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

  const backBookListing = () => {
    props.history.push("/books");
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div className="row g-3 w-50">
          <h4>You submitted successfully!</h4>
          <div className="col-sm-10 text-end">
            <button className="btn btn-primary me-md-2" onClick={backBookListing}>
              Back to Listing
            </button>
            <button className="btn btn-success" onClick={newBook}>
              Add New
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Add Book Detail</h3>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" htmlFor="title">Title<span className="red">*</span></span>
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

          <div className="input-group mb-3 w-50">
            <span className="input-group-text" htmlFor="author">Author<span className="red">*</span></span>

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

          <div className="w-50 text-end">
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