import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';

import Article from '../models/article';
import ArticlesCollection from '../models/articles-collection';

import Glance from './glance';
import Toolbelt from './toolbelt';
import Preview from './article-preview';

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
    articles.fetch().then(() => this.setState({articles: articles}));
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

    if(confirm("Are you sure? This article will be permanently deleted.")){
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
       content = (
         <ul className="article-list-wrapper">
         <div className="article-grabber">
           <form className="article-grabber-form" onSubmit={this.handleSubmit}>
             <input className="article-grabber-input" type="text" placeholder="article url (e.g http://wikipedia.org/wiki/penguin)" defaultValue={this.props.url} ref="articlesUrl" />
             <button className="article-grabber-btn" type="submit"><i className="fa fa-long-arrow-right"></i></button>
           </form>
         </div>
          {
            articles.map((result) => {
              return (
                  <div className="articles-wrapper" key={result.objectId}>
                    <ul className="article-preview-wrapper">
                      <Glance className="glance-view clearfix"/>
                      <li className="article-component">
                        <h1 className="article-title-preview"><Link to={`/article/${result.objectId}`} className="title-link">{result.title}</Link></h1>
                      </li>
                      <li className="article-component">
                        <a className="article-permalink" href={result.domain}>{result.domain}</a> <span className="article-preview-author">by {result.author}</span>
                      </li>
                      <li className="article-component">
                        <p className="article-content exceprt" dangerouslySetInnerHTML={{__html: result.excerpt}} />
                      </li>

                      <li className="tag-component">
                        <ul className="tags-list">
                          <li className="tag"><span className="octothorpe">&#35;</span> example</li>
                          <li className="tag"><span className="octothorpe">&#35;</span> example</li>
                          <li className="tag"><span className="octothorpe">&#35;</span> example</li>
                        </ul>
                      </li>

                      <li className="article-component">
                        <Toolbelt />
                      </li>

                    </ul>
                  </div>
              );
            })
          }
         </ul>
       );
     return content;
  }
});

export default Index;
