import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Article from './models/article';
import ArticlesCollection from './models/articles-collection';
import Session from './models/session';
import User from './models/user';
import UsersCollection from './models/users-collection';

let session = new Session();
let articles = new ArticlesCollection();
let users = new UsersCollection();

const Store = _.extend({}, Backbone.Events, {
  initialize() {
    this.listenTo(articles, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(users, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(session, 'change', this.trigger.bind(this, 'change'));
  },

  getArticles() {
    return articles.toJSON();
  },

  fetchArticles() {
    return articles.fetch();
  },

  getArticle(id) {
    let article = articles.get(id);
    if (article) {
      return article.toJSON();
    } else {
      articles.fetch();
      return {};
    }
  },

  saveArticle(article, options) {
    options = _.extend({}, options, {merge: true});
    return articles.create(article, options);
  },

  destroyArticle(article) {
    return aticles.get(article.objectId).destroy();
  },

  invalidateSession() {
    return session.invalidate();
  },

  authenticateSession(options) {
    return session.authenticate(options);
  },

  getSession() {
    return session.toJSON();
  },

  restoreSession() {
    return session.restore();
  },

  createUser(attributes) {
    // TODO: this user should be the currentUser instead of fetching again
    let user = new User(attributes);
    return user.save().then(() => {
      return session.authenticate({sessionToken: user.get('sessionToken')});
    });
  },

  saveUser(user, options) {
    options = _.extend({}, options, {merge: true});
    return users.create(user, options);
  },

  getUser(id) {
    let user = users.get(id);
    if (user) {
      return user.toJSON();
    } else {
      users.fetch();
      return {};
    }
  }
});

Store.initialize();

export default Store;
