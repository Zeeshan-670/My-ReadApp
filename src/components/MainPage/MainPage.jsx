import React, { Component } from "react";
import Book from "../Book/Book";
import Header from "../Header/Header";
import SearchButton from "../SearchButton/SearchButton";

class MainPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className='list-books-content'>
          <div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.books
                    .filter((book) => book.shelf === "currentlyReading")
                    .map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf={"currentlyReading"}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.books
                    .filter((book) => book.shelf === "wantToRead")
                    .map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf={"wantToRead"}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {this.props.books
                    .filter((book) => book.shelf === "read")
                    .map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          moveShelf={this.props.moveShelf}
                          currentShelf={"read"}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <SearchButton />
      </>
    );
  }
}

export default MainPage;
