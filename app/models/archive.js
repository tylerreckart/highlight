import store from '../store';
import _ from 'underscore';

var Archive = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://api.parse.com/1/classes/Archive',

  url() {
    var base = _.result(this, 'urlRoot');
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + '?include=creator';
  },

  defaults() {
    return {
      author: '',
      content: '',
      datePublished: '',
      excerpt: '',
      leadImageUrl: '',
      url: '',
      wordCount: '',
      time: Date.now(),
      creator: {}
    };
  },

  toJSON(options) {
    if(options) {
      return _.extend({}, this.attributes, {
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').objectId
        }
      });
    } else {
      return _.clone(this.attributes);
    }
  },

  save() {
    let currentUser = store.getSession().currentUser;
    if(currentUser) {
      if(this.isNew()) {
        this.set('creator', currentUser);
      }
      Backbone.Model.prototype.save.apply(this, arguments);
    } else {
      return new Promise((_, reject) => reject("Invalid session"));
    }
  }
});

export default Archive;
