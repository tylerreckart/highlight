import store from '../store';
import _ from 'underscore';

var Article = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://api.parse.com/1/classes/Article',

  url() {
    var base = _.result(this, 'urlRoot');
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
  },

  defaults() {
    return {
      author: '',
      content: '',
      date_published: '',
      excerpt: '',
      lead_image_url: '',
      url: '',
      word_count: ''
    }
  }
});

export default Article;
