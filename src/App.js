import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        { window.location.href === 'http://localhost:3000/#/' ? '' : <Nav /> }
        { routes }
      </div>
    );
  }
}

export default App;
