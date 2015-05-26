import React from 'react';
import Marty from 'marty';
import UserStore from 'stores/UserStore';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <main className="Dashboard">
        <h3>{ `Welcome, ${this.props.user.username}!` }</h3>
      </main>
    );
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
