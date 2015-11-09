import React from 'react';
import { Link, IndexLink } from 'react-router';

const Footer = React.createClass({
  render() {
    return (
      <div>
        <nav className="bottom-bar clearfix" role="navigation">
          <ul className="title-area">
            <li className="name">
              <span className="copy">&#169; Penguin Made. All rights reserved</span>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});

export default Footer;
