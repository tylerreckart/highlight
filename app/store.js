import $ from 'jquery';
import Backbone from 'backbone';

import Article from './models/article';
import ArticlesCollection from './models/articles-collection';

let articles;

export default {
  getArticlesCollection() {
    return (articles = articles || new ArticlesCollection());
  },

  getNewArticle() {
    return new Article();
  }
};
