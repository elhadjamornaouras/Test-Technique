import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <SearchBar />
      </div>
    );
  }
}

export default App;
