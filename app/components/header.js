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
      session: store.getSession(),
      user: store.getUser(currentUser && currentUser.objectId)
    };
  },

  handleLogOut(e) {
    e.preventDefault();

    store.invalidateSession();
  },
  
  render() {
    let user = this.state.user;
    let session = this.state.session.isAuthenticated;

    if (session === true) {
      return (
        <div>
          <nav className="top-bar" role="navigation">
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
                <button className="nav-option-toggle"><Link className="inherit" to="favorites"><i className="fa fa-heart"></i></Link></button>
              </li>
              <li className="nav-option">
                <button className="nav-option-toggle"><Link className="inherit" to ="archive"><i className="fa fa-bookmark"></i></Link></button>
              </li>
              <li className="nav-option">
                <button className="nav-option-toggle nav-email"><Link className="profile-link" to="profile">{user.username}</Link></button>
              </li>
              <li className="nav-option">
                <button className="logout-btn" onClick={this.handleLogOut}>Log Out</button>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="top-bar" data-topbar role="navigation">
            <ul className="title-area">
              <li className="name">
                <h1 className="logo-type"><IndexLink to="/">Highlight</IndexLink></h1>
              </li>
            </ul>
            <ul className="title-options">
              <li className="nav-option">
                <button className="login-btn"><Link className="nav-btn-link" to="login">Login</Link></button>
              </li>
              <li className="nav-option">
                <button className="signup-btn"><Link className="nav-btn-link" to="signup">Sign Up</Link></button>
              </li>
            </ul>
          </nav>
        </div>
      );
    }

    return content;
  }
});

export default Header;
