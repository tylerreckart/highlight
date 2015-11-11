import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

// import all of the models
import Archive from './models/archive';
import ArchiveCollection from './models/archive-collection';
import Article from './models/article';
import ArticlesCollection from './models/articles-collection';
import Favorite from './models/favorite';
import FavoritesCollection from './models/favorites-collection';
import Session from './models/session';
import User from './models/user';
import UsersCollection from './models/users-collection';

// initialize
let session = new Session();
let archive = new ArchiveCollection();
let articles = new ArticlesCollection();
let favorites = new FavoritesCollection();
let users = new UsersCollection();

const Store = _.extend({}, Backbone.Events, {
  initialize() {
    this.listenTo(archive, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(articles, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(favorites, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(users, 'add change remove', this.trigger.bind(this, 'change'));
    this.listenTo(session, 'change', this.trigger.bind(this, 'change'));
  },

  // archive

  getArchive() {
    return archive.toJSON();
  },

  fetchArchive() {
    return archive.fetch();
  },

  getArchived(id) {
    let article = archive.get(id);
    if (article) {
      return article.toJSON();
    } else {
      archive.fetch();
      return {};
    }
  },

  saveToArchive(article, options) {
    options = _.extend({}, options, {merge: true});
    return archive.create(article, options);
  },

  removeFromArchive(article) {
    return archive.get(article.objectId).destroy();
  },

  // base articles

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
    return articles.get(article.objectId).destroy();
  },

  // favorites

  getFavorites() {
    return favorites.toJSON();
  },

  fetchFavorites() {
    return favorites.fetch();
  },

  getFavorite(id) {
    let article = favorites.get(id);
    if (article) {
      return article.toJSON();
    } else {
      favorites.fetch();
      return {};
    }
  },

  saveFavorite(article, options) {
    options = _.extend({}, options, {merge: true});
    return favorites.create(article, options);
  },

  destroyFavorite(article) {
    return favorites.get(article.objectId).destroy();
  },

  // session

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
