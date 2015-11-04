import React from 'react';
import { Link, IndexLink } from 'react-router';

import Glance from './glance';
import PopOutMenu from './pop-out-menu';

const Preview = React.createClass({
  getInitialState() {
    return {
      glance: false,
      popOutMenu: false
    };
  },

  handleDestroy(result, e) {
    if(confirm("Are you sure? This article will be permanently deleted.")){
      store.destroyArticle(result);
      this.history.replaceState(null, '/');
    }
  },

  handleGlance(result, e) {
    this.setState({
      result,
      glance: !this.state.glance
    });
  },

  handlePopOut() {
    this.setState({
      popOutMenu: !this.state.popOutMenu
    });
  },

  render() {
    return (
      <div className="articles-wrapper">
        <ul className="article-preview-wrapper">

          { this.state.glance ? <Glance className="glance-view clearfix" /> : null }

          <li className="article-component">
            <h1 className="article-title-preview"><Link to={`/article/${this.props.result.objectId}`} className="title-link">{this.props.result.title}</Link></h1>
          </li>
          <li className="article-component">
            <a className="article-permalink" href={this.props.result.domain}>{this.props.result.domain}</a> <span className="article-preview-author">by {this.props.result.author}</span>
          </li>
          <li className="article-component">
            <p className="article-content exceprt" dangerouslySetInnerHTML={{__html: this.props.result.excerpt}} />
          </li>

          <ul className="article-options clearfix">

            <li className="article-option">
              <button className="option-toggle" onClick={this.handleGlance.bind(this, this.props.result)}><i className="fa fa-eye"></i></button>
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
              <button className="option-toggle" onClick={this.handleDestroy.bind(this, this.props.result)}><i className="fa fa-trash-o"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Delete</span>
              </span>
            </li>

            <li className="article-option">

              <button className="option-toggle" onClick={this.handlePopOut.bind(this, this.props.result)}><i className="fa fa-bars"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">More</span>
              </span>

              { this.state.popOutMenu ? <PopOutMenu /> : null }

            </li>

          </ul>
      </ul>
    </div>
    );
  }
});

export default Preview;
