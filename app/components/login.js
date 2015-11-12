import React from 'react';
import { History } from 'react-router';
import store from '../store';

const Login = React.createClass({
  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    let username = this.refs.email.value;
    let password = this.refs.password.value;

    store.authenticateSession({username, password}).then((loggedIn) => {
      if (!loggedIn)
        return this.setState({error: true});

      var { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    });
  },

  render() {
    return (
      <div>
        <div className="landing-hero">
          <h1 className="hero-text">Just read.</h1>
          <h2 className="hero-getter">Highlight is a platform for making the web more readable and gives you the tools to quickly save, organize, and view content from across the Internet.</h2>
        </div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h1>Log in to your Account</h1>
          <input className="login-field" ref="email" placeholder="email" />
          <input className="login-field" type="password" ref="password" placeholder="password" />
          <button className="login-form-btn" type="submit">Login</button> <span className="forgot-link">Forgot your password?</span>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      </div>
    )
  }
});

export default Login;
