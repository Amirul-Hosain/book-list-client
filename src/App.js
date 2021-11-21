import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AddBook from './components/AddBook/AddBook';
import BookList from './components/BookList/BookList';
import Header from './components/Header/Header';
import EditBook from './components/EditBook/EditBook';

function App() {
  const [books, setBooks] = useState([]);
  return (
    <div>
      <Router>
        <Header
          setBooks={setBooks}
        ></Header>
        <Switch>
          <Route exact path='/'>
            <AddBook></AddBook>
          </Route>
          <Route path='/addbook'>
            <AddBook></AddBook>
          </Route>
          <Route path='/booklist'>
            <BookList
              books={books}
              setBooks={setBooks}
            ></BookList>
          </Route>
          <Route path='/editbook/:id'>
            <EditBook></EditBook>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
