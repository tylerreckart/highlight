import Article from './article';

var ArticlesCollection = Backbone.Collection.extend({
  model: Article,
  url: 'https://api.parse.com/1/classes/Article',
  parse(response){
    return response.results;
  }
});

export default ArticlesCollection;
