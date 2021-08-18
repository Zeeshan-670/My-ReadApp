import React, { Component } from "react";
import Book from "../Book/Book";

import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    query: "",
    searchedBooks: [],
    books: [],
  };

  updateQuery = (query) => {
    this.setState({
      query: query,
    });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: searchedBooks });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  };

  render() {
    return (
      <>
        <div className='search-books'>
          {" "}
          <div className='search-books-bar'>
            <Link to='/'>
              <button className='close-search'>Close</button>
            </Link>
            <div className='search-books-input-wrapper'>
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input
                type='text'
                placeholder='Search by title or author'
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {this.state.searchedBooks.map((searchedBooks) => {
                let shelf = "none";

                this.props.books.map((book) =>
                  book.id === searchedBooks.id ? (shelf = book.shelf) : ""
                );
                return (
                  <li key={searchedBooks.id}>
                    <Book
                      book={searchedBooks}
                      moveShelf={this.moveShelf}
                      currentShelf={shelf}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default Search;
