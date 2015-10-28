import React from 'react';
import store from '../store';
import Article from '../models/article';
import { History } from 'react-router';

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
    let content;

    content = (
      <ul className="article-preview-wrapper">
        <li className="article-component"><h1 className="article-title">{article.title}</h1></li>
        <li className="article-component"><h3 className="article-link"><a href={article.url} target="_blank">{article.domain}</a></h3></li>
        <ul className="article-meta">
          <li className="article-meta-component">By {article.author}</li>
          <li classNAme="article-meta-component">{article.datePublished}</li>
        </ul>
        <li className="article-component"><p className="article-content">{article.content}</p></li>
        <li className="article-component"><p className="article-word-count">{article.wordCount}</p></li>
      </ul>
    );
    return content;
  }
});

export default ShowArticle;
