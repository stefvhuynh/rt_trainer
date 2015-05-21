import React from 'react';
import AuthUtils from 'utils/AuthUtils';
import LogIn from 'components/LogIn';
import Dashboard from 'components/Dashboard';

class RtTrainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let root = AuthUtils.isLoggedIn() ? <Dashboard/> : <LogIn/>;

    return(
      <div className="RtTrainer">
        { root }
      </div>
    );
  }
}

export default RtTrainer;
