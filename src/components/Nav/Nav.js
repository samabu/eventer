import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

  render() {
    return (
      <div className="nav_body">
        <nav className="nav_bar">
          <Link style={{textDecoration: 'none'}} to="/dashboard"><div className="nav_options">HOME</div></Link>
          <Link style={{textDecoration: 'none'}} to="/profile"><div className="nav_options">PROFILE</div></Link>
          <Link style={{textDecoration: 'none'}} to="/friends"><div className="nav_options">FRIENDS</div></Link>
          <Link style={{textDecoration: 'none'}} to="/events"><div className="nav_options">EVENTS</div></Link>
          <Link style={{textDecoration: 'none'}} to="/"><div className="nav_options">LOGOUT</div></Link>
        </nav>
      </div>
    );
  }
}

export default Nav;