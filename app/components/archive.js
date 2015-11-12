import React from 'react';
import store from '../store';
import { History, Link } from 'react-router';
import BackboneMixin from '../mixins/backbone';

import Archive from '../models/article';
import ArchiveCollection from '../models/articles-collection';

import ArchivePreview from './archive-preview';
import Paginator from 'react-pagify';

import $ from 'jquery';

var ArchiveIndex = React.createClass({

  mixins: [BackboneMixin, History],

  componentWillMount() {
    store.fetchArchive();
  },

  getModels() {
    return {
      articles: store.getArchive()
    };
  },

  render() {
    let articles = this.state.articles || [];
    let content;

       content = (
        <div>
        <h1 className="page-title">Archive</h1>
         <ul className="article-list-wrapper">
            {
              articles.map((result) => {
                return (
                    <ArchivePreview result={result} key={result.objectId} />
                );
              })
            }
           </ul>
         </div>
       );

     return content;
  }
});

export default ArchiveIndex;
