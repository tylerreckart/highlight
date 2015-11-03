import React from 'react';
import { Link, IndexLink } from 'react-router';

const Preview = React.createClass({
  render() {
    return (
      <ul className="article-options">
        <li className="article-option">
          <button className="option-toggle"><i className="fa fa-eye"></i></button>
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
          <button className="option-toggle"><i className="fa fa-bars"></i></button>
          <span className="tooltip">
            <span className="triangle" />
            <span className="tooltip-body">More</span>
          </span>
        </li>
      </ul>
    )
  }
});

export default Preview;
