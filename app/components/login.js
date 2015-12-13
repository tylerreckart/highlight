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
                <img className="logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItMzM5IDMzMyAxMzYgMTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0zMzkgMzMzIDEzNiAxMzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxRjFDMzA7fQ0KCS5zdDF7ZmlsbDojRkZEOTYzO30NCgkuc3Qye2ZpbGw6IzRCRDk2RTt9DQoJLnN0M3tmaWxsOiM1QUJBRjk7fQ0KCS5zdDR7ZmlsbDojRkZBQTAwO30NCgkuc3Q1e2ZpbGw6I0ZGMzY1MTt9DQoJLnN0NntmaWxsOiMzNTMzNEM7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMjAzLDQyNi41YzAsMTcsMCwyNS41LTguNSwzNHMtMTcsOC41LTM0LDguNWgtNTFjLTE3LDAtMjUuNSwwLTM0LTguNXMtOC41LTE3LTguNS0zNHYtNTENCgkJYzAtMTcsMC0yNS41LDguNS0zNHMxNy04LjUsMzQtOC41aDUxYzE3LDAsMjUuNSwwLDM0LDguNXM4LjUsMTcsOC41LDM0VjQyNi41eiIvPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMjMyLjYsNDA1LjNoLTc2LjhjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoNzYuOGMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIyOC4zLDQwMy40LTIzMC4yLDQwNS4zLTIzMi42LDQwNS4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yOTIuMyw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDQyMC40LTI5MCw0MjIuMy0yOTIuMyw0MjIuM3oiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0tMjgzLjgsNDM5LjRoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlTLTI4MS40LDQzOS40LTI4My44LDQzOS40eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTS0yOTIuMywzODguMmgtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDM4Ni4zLTI5MCwzODguMi0yOTIuMywzODguMnoiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0tMjgzLjgsMzcxLjFoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM2MwLTIuNCwxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI3OS41LDM2OS4yLTI4MS40LDM3MS4xLTI4My44LDM3MS4xeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yNDEuMSw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIzNi45LDQyMC40LTIzOC44LDQyMi4zLTI0MS4xLDQyMi4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTS0yMzIuNiw0MzkuNGgtMjUuNmMtMi40LDAtNC4zLTEuOS00LjMtNC4zczEuOS00LjMsNC4zLTQuM2gyNS42YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjI4LjMsNDM3LjUtMjMwLjIsNDM5LjQtMjMyLjYsNDM5LjR6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNLTI0MS4xLDM4OC4yaC04LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOC41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjM2LjksMzg2LjMtMjM4LjgsMzg4LjItMjQxLjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDM4OC4yaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksMzg2LjMtMjYzLjgsMzg4LjItMjY2LjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDQyMi4zaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksNDIwLjQtMjYzLjgsNDIyLjMtMjY2LjEsNDIyLjN6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNLTIzMi42LDM3MS4xaC0yNS42Yy0yLjQsMC00LjMtMS45LTQuMy00LjNjMC0yLjQsMS45LTQuMyw0LjMtNC4zaDI1LjZjMi40LDAsNC4zLDEuOSw0LjMsNC4zDQoJCQkJQy0yMjguMywzNjkuMi0yMzAuMiwzNzEuMS0yMzIuNiwzNzEuMXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K" alt="" />
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
