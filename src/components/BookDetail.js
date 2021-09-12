import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookService";
import Alert from 'react-bootstrap/Alert'

const BookDetail = props => {
  const initialBookState = {
    id: null,
    title: "",
    author: ""
  }
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  const getBookDetail = id => {
    BookDataService.get(id)
      .then(response => {
        setCurrentBook(response.data.content.data);
      })
      .catch(e => {
        console.log(e);
        setCurrentBook(null)
      });
  };

  useEffect(() => {
    getBookDetail(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateBook = () => {
    if (window.confirm('Are you sure you wish to update this book?')) {
      BookDataService.update(currentBook.id, currentBook)
        .then(response => {
          setMessage("The book was updated successfully!");
        })
        .catch(e => {
          console.log(e);
          setCurrentBook(null)
        });
    }
  };

  const deleteBook = () => {
    if (window.confirm('Are you sure you wish to delete this book?')) {
      BookDataService.remove(currentBook.id)
        .then(response => {
          props.history.push("/books");
        })
        .catch(e => {
          console.log(e);
          setCurrentBook(null)
        });
    }
  };

  const backBookListing = () => {
    props.history.push("/books");
  };

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book Detail</h4>
          {message ?
            <Alert variant="success" closeLabel="x" onClose={() => setMessage(null)} dismissible>
              {message}
            </Alert>
          : ''}
          <form>
            <div className="input-group mb-3 w-50">
              <span className="input-group-text" htmlFor="title">Title<span className="red">*</span></span>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3 w-50">
              <span className="input-group-text" htmlFor="author">Author<span className="red">*</span></span>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentBook.author}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end w-50 text-end">
            <button
              className="btn btn-sm btn-primary me-md-2"
              onClick={backBookListing}
              >
              Back to Listing
            </button>
            <button
              className="btn btn-sm btn-danger me-md-2"
              onClick={deleteBook}
              >
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-success"
              onClick={updateBook}
              >
              Update
            </button>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Book does not exist, please click a Book on listing...</p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;