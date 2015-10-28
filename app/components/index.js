import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';

import Article from '../models/article';
import ArticlesCollection from '../models/articles-collection';

import $ from 'jquery';

var Index = React.createClass({
  mixins: [History],

  getInitialState(){
    return {
      isEditing: false,
    };
  },

  componentWillMount(){
    let articles = new ArticlesCollection;
    articles.fetch().then(() => this.setState({articles: articles}))
  },

  handleEdit(){
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  handleSave(articles, e) {
    e.preventDefault();
    var model = this.state.articles.get(articles.objectId);
    model.set({ tags: this.refs.tags.value });
    model.save();

    this.setState({
      isEditing: false
    });
    this.history.replaceState(null, '/');
  },

  handleDestroy(articles, e) {
    e.preventDefault();

    if(confirm("Are you sure?")){
      var model = this.state.articles.get(articles.objectId);
      model.destroy();
      this.history.replaceState(null, '/');
    }
  },

  handleSubmit(e){
    e.preventDefault();
    var url = this.refs.articlesUrl.value;
    $.ajax({
      method: 'GET',
      dataType: 'jsonp',
      url: 'https://www.readability.com/api/content/v1/parser?url=' + url + '&token=af6b73cc6f021173b92f5bacf5e0c2eeecadd066&callback=?',
      success: function(data) {
        store.getArticlesCollection().create({
          author: data.author,
          content: data.content,
          domain: data.domain,
          datePublished: data.date_published,
          excerpt: data.excerpt,
          leadImageUrl: data.lead_image_url,
          title: data.title,
          url: data.url,
          wordCount: data.word_count
        });
      }
    });
  },

  render() {
    let articles = (this.state.articles && this.state.articles.toJSON()) || [];
    let content;

    if(this.state.isEditing) {
      content = (
        <ul className="article-list-wrapper isEditing">
        <div className="article-grabber">
          <form className="article-grabber-form" onSubmit={this.handleSubmit}>
            <input className="article-grabber-input" type="text" placeholder="articles url (e.g http://wikipedia.org/wiki/penguin)" defaultValue={this.props.url} ref="articlesUrl" />
            <button className="grab-btn" type="submit">+</button>
          </form>
        </div>
        {
          articles.map((result) => {
            return (
              <div className="application-container">
                <div className="article-grabber">
                  <form className="article-grabber-form" onSubmit={this.handleSubmit}>
                    <input className="article-grabber-input" type="text" placeholder="articles url (e.g http://wikipedia.org/wiki/penguin)" defaultValue={this.props.url} ref="articlesUrl" />
                    <button className="grab-btn" type="submit">+</button>
                  </form>
                </div>
                <div className="article-wrapper" key={articles.objectId}>
                  <h1 className="article-title">{result.title}</h1>
                  <h3 className="article-link">{result.url}</h3>
                  <p className="article-content">{result.content}</p>

                  <form className="tag-input-form">
                    <input className="tag-input" type="text" defaultValue={articles.tags} ref="tags" />
                    <button className="save-btn" type="submit" onClick={this.handleSave.bind(this, articles)}>Save</button>
                    <button className="destroy-btn" type="submit" onClick={this.handleDestroy.bind(this, articles)}>Delete articles</button>
                  </form>
                </div>
              </div>
            );
          })
        }
        </ul>
      );
     } else {
       content = (
         <ul className="article-list-wrapper">
         <div className="article-grabber">
           <form className="article-grabber-form" onSubmit={this.handleSubmit}>
             <input className="article-grabber-input" type="text" placeholder="article url (e.g http://wikipedia.org/wiki/penguin)" defaultValue={this.props.url} ref="articlesUrl" />
             <button className="grab-btn" type="submit">+</button>
           </form>
         </div>
          {
            articles.map((result) => {
              return (
                  <div className="articles-wrapper" key={articles.objectId}>
                    <ul className="article-preview-wrapper">
                      <li className="article-component"><h1 className="article-title"><Link to={`/article/${result.objectId}`}>{result.title}</Link></h1></li>
                      <li className="article-component"><h3 className="article-link"><a href={result.url} target="_blank">{result.domain}</a></h3></li>
                      <li className="article-component"><p className="article-content">{result.excerpt}</p></li>
                    </ul>
                  </div>
              );
            })
          }
         </ul>
       );
     }
     return content;
  }
});

export default Index;
