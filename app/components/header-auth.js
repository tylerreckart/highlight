import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import update from 'react-addons-update';
import { Link, IndexLink } from 'react-router';

const HeaderAuth = React.createClass({
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
              <button className="nav-option-toggle"><i className="fa fa-newspaper-o"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Browse</span>
              </span>
            </li>
            <li className="nav-option">
              <button className="nav-option-toggle"><i className="fa fa-star"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Favorites</span>
              </span>
            </li>
            <li className="nav-option">
              <button className="nav-option-toggle"><i className="fa fa-sticky-note-o"></i></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Archive</span>
              </span>
            </li>
            <li className="nav-option">
              <button className="nav-option-toggle nav-email"><Link className="profile-link" to="profile">{user.username}</Link></button>
              <span className="tooltip">
                <span className="triangle" />
                <span className="tooltip-body">Account settings &amp; more</span>
              </span>
            </li>
            <li className="nav-option">
              <button className="logout-btn" onClick={this.handleLogOut}>Log Out</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});

export default HeaderAuth;
