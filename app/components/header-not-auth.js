import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import update from 'react-addons-update';
import { Link, IndexLink } from 'react-router';

const Header = React.createClass({
  mixins: [BackboneMixin],
  
  getModels() {
    var currentUser = store.getSession().currentUser;
    return {
      user: store.getUser(currentUser && currentUser.objectId)
    };
  },

  handleLogOut(e) {
    e.preventDefault();

    store.invalidateSession();
  },
  
  render() {
    let user = this.state.user;

    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1 className="logo-type"><IndexLink to="/">Highlight</IndexLink></h1>
            </li>
            <li className="search">
              <label className="search-input-label"><i className="fa fa-search"></i></label><input type="text" className="search-input" placeholder="Search" />
            </li>
          </ul>
          <ul className="title-options">
            <li className="nav-option">
              <button className="signup-btn"><Link className="nav-btn-link" to="signup">Sign Up</Link></button>
            </li>
            <li className="nav-option">
              <button className="login-btn"><Link className="nav-btn-link" to="login">Login</Link></button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});

export default HeaderNotAuth;
