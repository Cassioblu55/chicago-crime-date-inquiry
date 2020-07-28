import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header/Header"
import ResultPrimary from './components/ResultPrimary/ResultPrimary';
import ResultSecondaryContainer from "./components/ResultSecondaryContainer/ResultSecondaryContainer"
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ResultPrimary />
        <ResultSecondaryContainer />
      </div>
    );
  }
}

export default App;
