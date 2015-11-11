import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import ArchiveIndex from './components/archive';
import FavoritesIndex from './components/favorites';
import Login from './components/login';
import ShowArticle from './components/show-article';
import SignUp from './components/signup';
import Profile from './components/profile';

import store from './store';

function requireAuth(nextState, replaceState) {
  if ( ! store.getSession().isAuthenticated) {
    replaceState({ nextPathname: nextState.location.pathname}, '/login');
  }
}

function requireNotAuth(nextState, replaceState) {
  if(store.getSession().isAuthenticated) {
    replaceState({}, '/');
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} onEnter={requireAuth} />

      <Route path="article/:id" component={ShowArticle} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="archive" component={ArchiveIndex} onEnter={requireAuth} />
      <Route path="favorites" component={FavoritesIndex} onEnter={requireAuth} />

      <Route path="login" component={Login} onEnter={requireNotAuth} />
      <Route path="signup" component={SignUp} onEnter={requireNotAuth} />
    </Route>
  </Router>
), document.getElementById('application'));
