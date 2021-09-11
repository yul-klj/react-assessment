import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookService";

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
        });
    }
  };

  const deleteBook = () => {
    if (window.confirm('Are you sure you wish to delete this book?')) {
      BookDataService.remove(currentBook.id)
        .then(response => {
          console.log(response.data);
          props.history.push("/books");
        })
        .catch(e => {
          console.log(e);
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
          <div
            style={message ? {} : { display: 'none' }}
            class="alert alert-primary"
            role="alert"
          >
            <p>{message}</p>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
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

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-sm btn-primary me-md-2"
              onClick={backBookListing}>
              Back
            </button>
            <button
              className="btn btn-sm btn-danger me-md-2"
              onClick={deleteBook}>
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
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;