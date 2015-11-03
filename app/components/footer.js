import React from 'react';
import { Link, IndexLink } from 'react-router';

const Footer = React.createClass({
  render() {
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <span className="copy">&#169; Penguin Made. All rights reserved</span>
            </li>
          </ul>
          <ul className="title-options">
            <li className="nav-option">
              <Link to="/tos">Terms of Service</Link>
            </li>
            <li className="nav-option">
              <Link to="/privacy">Privacy</Link>
            </li>
            <li className="nav-option">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-option">
              <Link to="/about">Blog</Link>
            </li>
            <li className="nav-option">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="nav-option">
              <Link to="/security">Secuirty</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});

export default Footer;
