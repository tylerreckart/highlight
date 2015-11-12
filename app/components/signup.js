import React from 'react';
import { History } from 'react-router';
import store from '../store';

const SignUp = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    let email = this.refs.email.value;
    let username = email;
    let password = this.refs.password.value;

    store.createUser({username, password, email}).then(() => {
      let { location } = this.props;
      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    }, (xhr) => {
      this.setState({ error: xhr.responseJSON.error });
    });
  },

  render() {
    return (
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        <input className="signup-field" ref="email" placeholder="enter an email address" />
        <input className="signup-field" type="password" ref="password" placeholder="create a password" />
        <button className="signup-btn" type="submit">Sign Up</button> <span className="is-it-free">It's totally free!</span>
        {this.state.error && (
          <p>{this.state.error}</p>
        )}
      </form>
    )
  }
});

export default SignUp;
