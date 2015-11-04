import React from 'react';

import Header from './header';
import Footer from './footer';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return (
      <div>
        <Header />
        <div className="body-content">
          {this.props.children}
        </div>
      </div>
    );
  }

});

export default App;
