import React from 'react';
import { Link, IndexLink } from 'react-router';

import $ from 'jquery';

const Toolbelt = React.createClass({
  handlePopOut() {
    $('.pop-out-menu').toggle();
  },

  toggleVisibility() {
    $('.glance').toggle();
  },

  render() {
    return (
      <ul className="article-options clearfix">

        <li className="article-option">
          <button className="option-toggle" onClick={this.toggleVisibility.bind(this)}><i className="fa fa-eye"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">Glance</span>
          </span>
        </li>

        <li className="article-option">
          <button className="option-toggle"><i className="fa fa-star"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">Favorite</span>
          </span>
        </li>

        <li className="article-option">
          <button className="option-toggle"><i className="fa fa-sticky-note-o"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">Archive</span>
          </span>
        </li>

        <li className="article-option">
          <button className="option-toggle"><i className="fa fa-trash-o"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">Delete</span>
          </span>
        </li>

        <li className="article-option">
          <button className="option-toggle" onClick={this.handlePopOut.bind(this)}><i className="fa fa-bars"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">More</span>
          </span>

          <div className="pop-out-menu">
            <span className="pop-out-triangle"></span>
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
        </li>

      </ul>
    )
  }
});

export default Toolbelt;
