import Marty from 'marty';
import UserConstants from 'constants/UserConstants';
import ApiUtils from 'utils/ApiUtils';
import AuthUtils from 'utils/AuthUtils';

class UserActions extends Marty.ActionCreators {
  logIn(user) {
    this.dispatch(UserConstants.LOG_IN, { user: user });
  }

  attemptLogIn(username, password) {
    ApiUtils.createSession(
      username,
      password,
      user => {
        if (user.sessionToken) {
          AuthUtils.setSessionCookie(user.sessionToken);
          this.logIn(user);
        } else {
          this.failLogIn();
        }
      },
      error => this.failLogIn()
    );

    this.dispatch(UserConstants.ATTEMPT_LOG_IN);
  }

  failLogIn() {
    this.dispatch(UserConstants.FAIL_LOG_IN);
  }

  attemptSignUp(email, username, password) {
  }

  getUser() {
  }
}

export default Marty.register(UserActions);
