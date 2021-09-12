import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail";
import BookList from "./components/BookList";
import Export from "./components/Export";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/books" className="navbar-brand">
          Books Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Listing
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add New
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/export"} className="nav-link">
              Export
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/books"]} component={BookList}/>
          <Route exact path="/add" component={AddBook} />
          <Route path="/book/:id" component={BookDetail}/>
          <Route path="/export" component={Export}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
