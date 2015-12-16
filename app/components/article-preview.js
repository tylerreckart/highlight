import React from 'react';
import store from '../store';
import { Link, IndexLink } from 'react-router';

import Glance from './glance';
import moment from 'moment';
import Icon from 'react-geomicons';

const Preview = React.createClass({

  getInitialState() {
    return {
      glance: false
    };
  },

  handleAddToArchive(result, e) {
    store.saveToArchive({
      author: result.author,
      content: result.content,
      domain: result.domain,
      datePublished: result.date_published,
      excerpt: result.excerpt,
      leadImageUrl: result.lead_image_url,
      title: result.title,
      url: result.url,
      wordCount: result.word_count
    });
    store.destroyArticle(result);
  },

  handleAddToFavorites(result, e) {
    store.saveFavorite({
      author: result.author,
      content: result.content,
      domain: result.domain,
      datePublished: result.date_published,
      excerpt: result.excerpt,
      leadImageUrl: result.lead_image_url,
      title: result.title,
      url: result.url,
      wordCount: result.word_count
    });
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
    console.log(this.props.result.domain);

    return (
      <div className="articles-wrapper">
        <ul className="article-preview-wrapper">

          { this.state.glance ? <Glance className="glance-view clearfix" result={this.props.result} /> : null }

          <li className="article-component">
            <h1 className="article-title-preview"><Link to={`/article/${this.props.result.objectId}`} className="title-link">{this.props.result.title}</Link></h1>
          </li>
          <li className="article-component">
            <a className="article-permalink" href={this.props.result.url} target="_blank">{this.props.result.domain}</a> <span className="article-preview-author">by {this.props.result.author}</span> <span className="bullet">&#x2022;</span> <span className="article-preview-reading-time">{readingTime()}</span>
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
              <button className="option-toggle" onClick={this.handleAddToFavorites.bind(this, this.props.result)}><i className="fa fa-heart"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Favorite</span>
              </span>
            </li>

            <li className="article-option">
              <button className="option-toggle" onClick={this.handleAddToArchive.bind(this, this.props.result)}><i className="fa fa-bookmark"></i></button>
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

export default Preview;
