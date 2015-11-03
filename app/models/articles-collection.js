import Article from './article';

var ArticlesCollection = Backbone.Collection.extend({
  sort_key: 'createdAt', // most recent article first

  comparator(item) {
    return !item.get(this.sort_key);
  },

  sortByField(fieldName) {
    this.sort_key = fieldName;
    this.sort();
  },

  model: Article,
  url: 'https://api.parse.com/1/classes/Article',
  parse(response){
    return response.results;
  }
});

export default ArticlesCollection;
