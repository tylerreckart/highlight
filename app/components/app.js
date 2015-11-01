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
        </nav>
        <div className="body-content">
          {this.props.children}
        </div>
      </div>
    );
  }

});

export default App;
