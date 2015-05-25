import React from 'react';
import Marty from 'marty';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>{ this.props.user.username }</h2>
        <h3>{ this.props.user.email }</h3>
        <button onClick={ this._onLogOutClick() }>Log Out</button>
      </div>
    );
  }

  _onLogOutClick() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.logOut();
    }

    return boundFn;
  }
}

export default Marty.createContainer(Dashboard, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.getUser();
    }
  }
});
