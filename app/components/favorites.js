import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';

import Favorite from '../models/article';
import FavoritesCollection from '../models/articles-collection';

import FavoritePreview from './favorite-preview';
import Paginator from 'react-pagify';

import $ from 'jquery';

var FavoriteIndex = React.createClass({

  mixins: [BackboneMixin, History],

  componentWillMount() {
    store.fetchFavorites();
  },

  getModels() {
    return {
      articles: store.getFavorites()
    };
  },

  render() {
    let articles = this.state.articles || [];
    let content;

       content = (
        <div>
         <ul className="article-list-wrapper">
            {
              articles.map((result) => {
                return (
                    <FavoritePreview result={result} key={result.objectId} />
                );
              })
            }
           </ul>
         </div>
       );

     return content;
  }
});

export default FavoriteIndex;
