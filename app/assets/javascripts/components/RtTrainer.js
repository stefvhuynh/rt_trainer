import React from 'react';
import Marty from 'marty';
import AuthUtils from 'utils/AuthUtils';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import LogIn from 'components/LogIn';
import Dashboard from 'components/Dashboard';

class RtTrainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let root;

    if (AuthUtils.isLoggedIn()) {
      root = <Dashboard/>;
      if (!this.props.hasLoadedUser) {
        UserActions.getUserData();
      }
    } else {
      root = <LogIn/>;
    }

    return(
      <div className="RtTrainer">
        { root }
      </div>
    );
  }
}

export default Marty.createContainer(RtTrainer, {
  listenTo: UserStore,
  fetch: {
    hasLoadedUser() {
      return UserStore.hasLoadedUser();
    }
  }
});
