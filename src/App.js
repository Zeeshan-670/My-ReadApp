import React from "react";
import "./App.css";
import Search from "./components/Search/Search";
import * as BooksAPI from "./BooksAPI";
import MainPage from "./components/MainPage/MainPage";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  };
  render() {
    return (
      <div className='app'>
        <div className='list-books'>
          <Route
            exact
            path='/'
            render={() => (
              <MainPage books={this.state.books} moveShelf={this.moveShelf} />
            )}
          />

          <Route
            exact
            path='/search'
            render={() => <Search books={this.state.books} />}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
