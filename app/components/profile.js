import React from 'react';
import BackboneMixin from '../mixins/backbone';
import store from '../store';
import update from 'react-addons-update';

const Profile = React.createClass({

  mixins: [BackboneMixin],

  getInitialState() {
    return {
      isEditing: false
    }
  },

  getModels() {
    var currentUser = store.getSession().currentUser;
    return {
      user: store.getUser(currentUser && currentUser.objectId)
    };
  },

  handleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  handleName(e) {
    this.setState({
      user: update(this.state.user, {
        name: {$set: e.target.value}
      })
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    store.saveUser(this.state.user);
    this.handleEdit();
  },

  render() {
    let user = this.state.user;

    if(this.state.isEditing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input value={user.username} onChange={this.handleName} />
          <input type="password" value={user.password} onChange={this.handlePassword} />
          <button type="submit">Save</button>
        </form>
      );
    } else {
      return (
        <div>
          <h1>{user.username}</h1>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }
  }
});

export default Profile;
