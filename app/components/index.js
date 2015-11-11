import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';

import Article from '../models/article';
import ArticlesCollection from '../models/articles-collection';

import Preview from './article-preview';
import Paginator from 'react-pagify';

import $ from 'jquery';

var Index = React.createClass({

  mixins: [BackboneMixin, History],

  componentWillMount() {
    store.fetchArticles();
  },

  getModels() {
    return {
      articles: store.getArticles()
    };
  },

  handleSubmit(e){
    e.preventDefault();
    var url = this.refs.articlesUrl.value;
    $.ajax({
      method: 'GET',
      dataType: 'jsonp',
      url: 'https://www.readability.com/api/content/v1/parser?url=' + url + '&token=af6b73cc6f021173b92f5bacf5e0c2eeecadd066&callback=?',
      success: function(data) {
        store.saveArticle({
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

    this.refs.articlesUrl.value = '';
  },

  render() {
    let articles = this.state.articles || [];
    let content;

       content = (
        <div>
         <ul className="article-list-wrapper">
           <div className="article-grabber">
             <form className="article-grabber-form" onSubmit={this.handleSubmit}>
               <input className="article-grabber-input" type="text" placeholder="article url (e.g http://www.example.com/article)" defaultValue={this.props.url} ref="articlesUrl" />
               <button className="article-grabber-btn" type="submit"><i className="fa fa-long-arrow-right"></i></button>
             </form>
           </div>
            {
              articles.map((result) => {
                return (
                    <Preview result={result} key={result.objectId} />
                );
              })
            }
           </ul>
         </div>
       );

     return content;
  }
});

export default Index;
