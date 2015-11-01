import React from 'react';
import { IndexLink } from 'react-router';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1 className="logo-type"><IndexLink to="/">Highlight</IndexLink></h1>
            </li>
          </ul>
          <ul className="title-options">
            <li className="nav-option">
              <a className="nav-option-toggle"><i className="fa fa-star"> Favorties</i></a>
            </li>
            <li className="nav-option">
              <a className="nav-option-toggle"><i className="fa fa-sticky-note-o"> Archive</i></a>
            </li>
            <li className="nav-option">
              <a className="nav-option-toggle">tyler.reckart@gmail.com</a>
            </li>
          </ul>
        </nav>
        <div className="body-content">
          {this.props.children}
        </div>
      </div>
    );
  }

});

export default App;
