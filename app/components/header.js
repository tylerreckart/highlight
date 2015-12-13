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
                <IndexLink to="/">
                  <img className="logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItMzM5IDMzMyAxMzYgMTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0zMzkgMzMzIDEzNiAxMzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxRjFDMzA7fQ0KCS5zdDF7ZmlsbDojRkZEOTYzO30NCgkuc3Qye2ZpbGw6IzRCRDk2RTt9DQoJLnN0M3tmaWxsOiM1QUJBRjk7fQ0KCS5zdDR7ZmlsbDojRkZBQTAwO30NCgkuc3Q1e2ZpbGw6I0ZGMzY1MTt9DQoJLnN0NntmaWxsOiMzNTMzNEM7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMjAzLDQyNi41YzAsMTcsMCwyNS41LTguNSwzNHMtMTcsOC41LTM0LDguNWgtNTFjLTE3LDAtMjUuNSwwLTM0LTguNXMtOC41LTE3LTguNS0zNHYtNTENCgkJYzAtMTcsMC0yNS41LDguNS0zNHMxNy04LjUsMzQtOC41aDUxYzE3LDAsMjUuNSwwLDM0LDguNXM4LjUsMTcsOC41LDM0VjQyNi41eiIvPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMjMyLjYsNDA1LjNoLTc2LjhjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoNzYuOGMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIyOC4zLDQwMy40LTIzMC4yLDQwNS4zLTIzMi42LDQwNS4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yOTIuMyw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDQyMC40LTI5MCw0MjIuMy0yOTIuMyw0MjIuM3oiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0tMjgzLjgsNDM5LjRoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlTLTI4MS40LDQzOS40LTI4My44LDQzOS40eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTS0yOTIuMywzODguMmgtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDM4Ni4zLTI5MCwzODguMi0yOTIuMywzODguMnoiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0tMjgzLjgsMzcxLjFoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM2MwLTIuNCwxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI3OS41LDM2OS4yLTI4MS40LDM3MS4xLTI4My44LDM3MS4xeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yNDEuMSw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIzNi45LDQyMC40LTIzOC44LDQyMi4zLTI0MS4xLDQyMi4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTS0yMzIuNiw0MzkuNGgtMjUuNmMtMi40LDAtNC4zLTEuOS00LjMtNC4zczEuOS00LjMsNC4zLTQuM2gyNS42YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjI4LjMsNDM3LjUtMjMwLjIsNDM5LjQtMjMyLjYsNDM5LjR6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNLTI0MS4xLDM4OC4yaC04LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOC41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjM2LjksMzg2LjMtMjM4LjgsMzg4LjItMjQxLjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDM4OC4yaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksMzg2LjMtMjYzLjgsMzg4LjItMjY2LjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDQyMi4zaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksNDIwLjQtMjYzLjgsNDIyLjMtMjY2LjEsNDIyLjN6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNLTIzMi42LDM3MS4xaC0yNS42Yy0yLjQsMC00LjMtMS45LTQuMy00LjNjMC0yLjQsMS45LTQuMyw0LjMtNC4zaDI1LjZjMi40LDAsNC4zLDEuOSw0LjMsNC4zDQoJCQkJQy0yMjguMywzNjkuMi0yMzAuMiwzNzEuMS0yMzIuNiwzNzEuMXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K" alt="" />
                </IndexLink>
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
          <nav className="top-bar clearfix" role="navigation">
            <ul className="title-area">
              <li className="name">
                <IndexLink to="/">
                  <img className="logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItMzM5IDMzMyAxMzYgMTM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0zMzkgMzMzIDEzNiAxMzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxRjFDMzA7fQ0KCS5zdDF7ZmlsbDojRkZEOTYzO30NCgkuc3Qye2ZpbGw6IzRCRDk2RTt9DQoJLnN0M3tmaWxsOiM1QUJBRjk7fQ0KCS5zdDR7ZmlsbDojRkZBQTAwO30NCgkuc3Q1e2ZpbGw6I0ZGMzY1MTt9DQoJLnN0NntmaWxsOiMzNTMzNEM7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMjAzLDQyNi41YzAsMTcsMCwyNS41LTguNSwzNHMtMTcsOC41LTM0LDguNWgtNTFjLTE3LDAtMjUuNSwwLTM0LTguNXMtOC41LTE3LTguNS0zNHYtNTENCgkJYzAtMTcsMC0yNS41LDguNS0zNHMxNy04LjUsMzQtOC41aDUxYzE3LDAsMjUuNSwwLDM0LDguNXM4LjUsMTcsOC41LDM0VjQyNi41eiIvPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMjMyLjYsNDA1LjNoLTc2LjhjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoNzYuOGMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIyOC4zLDQwMy40LTIzMC4yLDQwNS4zLTIzMi42LDQwNS4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yOTIuMyw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDQyMC40LTI5MCw0MjIuMy0yOTIuMyw0MjIuM3oiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0tMjgzLjgsNDM5LjRoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlTLTI4MS40LDQzOS40LTI4My44LDQzOS40eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTS0yOTIuMywzODguMmgtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI4OC4xLDM4Ni4zLTI5MCwzODguMi0yOTIuMywzODguMnoiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0tMjgzLjgsMzcxLjFoLTI1LjZjLTIuNCwwLTQuMy0xLjktNC4zLTQuM2MwLTIuNCwxLjktNC4zLDQuMy00LjNoMjUuNmMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTI3OS41LDM2OS4yLTI4MS40LDM3MS4xLTI4My44LDM3MS4xeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTS0yNDEuMSw0MjIuM2gtOC41Yy0yLjQsMC00LjMtMS45LTQuMy00LjNzMS45LTQuMyw0LjMtNC4zaDguNWMyLjQsMCw0LjMsMS45LDQuMyw0LjMNCgkJCQlDLTIzNi45LDQyMC40LTIzOC44LDQyMi4zLTI0MS4xLDQyMi4zeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTS0yMzIuNiw0MzkuNGgtMjUuNmMtMi40LDAtNC4zLTEuOS00LjMtNC4zczEuOS00LjMsNC4zLTQuM2gyNS42YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjI4LjMsNDM3LjUtMjMwLjIsNDM5LjQtMjMyLjYsNDM5LjR6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNLTI0MS4xLDM4OC4yaC04LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOC41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjM2LjksMzg2LjMtMjM4LjgsMzg4LjItMjQxLjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDM4OC4yaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksMzg2LjMtMjYzLjgsMzg4LjItMjY2LjEsMzg4LjJ6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNLTI2Ni4xLDQyMi4zaC05LjVjLTIuNCwwLTQuMy0xLjktNC4zLTQuM3MxLjktNC4zLDQuMy00LjNoOS41YzIuNCwwLDQuMywxLjksNC4zLDQuMw0KCQkJCUMtMjYxLjksNDIwLjQtMjYzLjgsNDIyLjMtMjY2LjEsNDIyLjN6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNLTIzMi42LDM3MS4xaC0yNS42Yy0yLjQsMC00LjMtMS45LTQuMy00LjNjMC0yLjQsMS45LTQuMyw0LjMtNC4zaDI1LjZjMi40LDAsNC4zLDEuOSw0LjMsNC4zDQoJCQkJQy0yMjguMywzNjkuMi0yMzAuMiwzNzEuMS0yMzIuNiwzNzEuMXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K" alt="" />
                </IndexLink>
              </li>
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
