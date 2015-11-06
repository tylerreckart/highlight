import React from 'react';
import store from '../store';
import Article from '../models/article';
import { History } from 'react-router';

import $ from 'jquery';
import moment from 'moment';

const ShowArticle = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      isEditing: false
    };
  },

  componentWillMount() {
    let articleId = this.props.params.id;

    let article = new Article({objectId: articleId});
    article.fetch().then(() => this.setState({article: article}));
  },

  handleDestroy(e) {
    e.preventDefault();
    if(confirm("Are you sure?")){
      this.state.article.destroy();
    }
  },

  render() {
    let article = (this.state.article && this.state.article.toJSON()) || {};

    let wordCount = article.wordCount;
    let minutes = Math.floor(wordCount / 275);
    if(minutes === 0) minutes = 1;
    
    function readingTime() {
      if(minutes === 1) {
        return minutes + ' minute read';
      } else if(minutes > 1) {
        return minutes + ' minutes read';
      }
    }

    let author = 'by ' + article.author;
    let datePublished = 'on ' + moment(article.datePublished).format("MMM Do YYYY");

    let content;

    content = (
      <div>
        <ul className="article-wrapper">
        <div className="article-head">
          <li className="article-component"><h1 className="article-title">{article.title}</h1></li>
          <ul className="article-meta clearfix">
            <li className="article-meta-component">
              <a className="article-link" href={article.url} target="_blank">{article.domain}</a>
            </li>
            <li className="article-meta-component">{author}</li>
            <li className="article-meta-component">{datePublished}</li>
            <li className="article-meta-component">
              <span className="article-word-count"><span className="bullet">&#x2022;</span> {readingTime()}</span>
            </li>
          </ul>
        </div>
          <li className="article-component"><div className="article-content" dangerouslySetInnerHTML={{ __html: article.content}}/></li>
      </ul>
      </div>
    );

    return content;
  }
});

export default ShowArticle;
