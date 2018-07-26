import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        { window.location.href === `${window.origin}/#/` ? '' : <Nav /> }
        { routes }
      </div>
    );
  }
}

export default App;
