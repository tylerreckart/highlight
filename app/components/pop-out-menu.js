import React from 'react';
import store from '../store';
import { Link, IndexLink } from 'react-router';

import $ from 'jquery';

const PopOutMenu = React.createClass({

  render() {
    return (
      <div className="pop-out-menu">
        <ul className="pop-out-menu-list">
          <li className="pop-out-option">
            <button className="pop-out-button">Share on Facebook</button>
          </li>
          <li className="pop-out-option">
            <button className="pop-out-button">Tweet</button>
          </li>
          <li className="pop-out-option">
            <button className="pop-out-button">Copy link to article</button>
          </li>
          <li className="pop-out-option">
            <button className="pop-out-button">Add/Remove tags</button>
          </li>
        </ul>
      </div>
    )
  }
});

export default PopOutMenu;
