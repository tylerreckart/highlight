import Archive from './archive';

var ArchiveCollection = Backbone.Collection.extend({
  sort_key: 'time', // most recent article first

  comparator(model) {
    return -model.get(this.sort_key);
  },

  sortByField(fieldName) {
    this.sort_key = fieldName;
    this.sort();
  },

  model: Archive,
  url: 'https://api.parse.com/1/classes/Archive',
  parse(response){
    return response.results;
  }
});

export default ArchiveCollection;
