import Favorite from './favorite';

var FavoritesCollection = Backbone.Collection.extend({
  sort_key: 'time', // most recent article first

  comparator(model) {
    return -model.get(this.sort_key);
  },

  sortByField(fieldName) {
    this.sort_key = fieldName;
    this.sort();
  },

  model: Favorite,
  url: 'https://api.parse.com/1/classes/Favorite',
  parse(response){
    return response.results;
  }
});

export default FavoritesCollection;
