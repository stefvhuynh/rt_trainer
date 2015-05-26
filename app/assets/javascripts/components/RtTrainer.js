import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import AuthUtils from 'utils/AuthUtils';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import Header from 'components/header';
import LogIn from 'components/LogIn';
import Dashboard from 'components/Dashboard';

const { RouteHandler } = Router;

class RtTrainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let root;

    if (AuthUtils.isLoggedIn()) {
      root = <div><Header/><RouteHandler/></div>;

      if (!this.props.hasLoadedUser) {
        UserActions.getUserData();
      }
    } else {
      root = <LogIn/>;
      this.context.router.transitionTo('root');
    }

    return(
      <div className="RtTrainer">
        { root }
      </div>
    );
  }
}

RtTrainer.contextTypes = { router: React.PropTypes.func.isRequired };

export default Marty.createContainer(RtTrainer, {
  listenTo: UserStore,
  fetch: {
    hasLoadedUser() {
      return UserStore.hasLoadedUser();
    }
  }
});
