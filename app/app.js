import Promise from 'es6-promise';
Promise.polyfill();

// initializers
import './initializers/parse';
import './initializers/session';

// router
import './router';
