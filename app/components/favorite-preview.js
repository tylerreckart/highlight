import React from 'react';
import store from '../store';
import { Link, IndexLink } from 'react-router';

import Glance from './glance';
import moment from 'moment';
import Icon from 'react-geomicons';

const FavoritePreview = React.createClass({

  getInitialState() {
    return {
      glance: false
    };
  },

  handleDestroy(result, e) {
    if(confirm("Are you sure? This article will be removed from the archive and permanently deleted.")){
      store.removeFromArchive(result);
      this.history.replaceState(null, '/');
    }
  },

  handleGlance(result, e) {
    this.setState({
      result,
      glance: !this.state.glance
    });
  },

  render() {
    let wordCount = this.props.result.wordCount;
    let minutes = Math.round(wordCount / 250);
    if(minutes === 0) minutes = 1;
    
    function readingTime() {
      if(minutes === 1) {
        return minutes + ' minute read';
      } else if(minutes > 1) {
        return minutes + ' minutes read';
      }
    }

    let author = 'by ' + this.props.result.author;
    let datePublished = 'on ' + moment(this.props.result.datePublished).format("MMM Do YYYY");

    return (
      <div className="articles-wrapper">
        <ul className="article-preview-wrapper">

          { this.state.glance ? <Glance className="glance-view clearfix" result={this.props.result} /> : null }

          <li className="article-component">
            <h1 className="article-title-preview"><Link to={`/article/${this.props.result.objectId}`} className="title-link">{this.props.result.title}</Link></h1>
          </li>
          <li className="article-component">
            <a className="article-permalink" href={this.props.result.domain}>{this.props.result.domain}</a> <span className="article-preview-author">by {this.props.result.author}</span> <span className="bullet">&#x2022;</span> <span className="article-preview-reading-time">{readingTime()}</span>
          </li>
          <li className="article-component">
            <p className="article-content exceprt" dangerouslySetInnerHTML={{__html: this.props.result.excerpt}} />
          </li>
          <li className="article-component">
            <ul className="tags-list clearfix">
              <li className="tag">
                tag name
              </li>
              <li className="tag">
                another tag name
              </li>
              <li className="tag">
                a cool tag
              </li>
              <li className="edit-btn-wrapper">
                <button className="edit-btn">Edit Tags</button>
              </li>
            </ul>
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
              <button className="option-toggle"><i className="fa fa-heart"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Favorite</span>
              </span>
            </li>

            <li className="article-option">
              <button className="option-toggle" onClick={this.handleDestroy.bind(this, this.props.result)}><i className="fa fa-trash-o"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Remove from Archive</span>
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
      </ul>
    </div>
    );
  }
});

export default FavoritePreview;
