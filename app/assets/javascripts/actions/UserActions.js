import Marty from 'marty';
import UserConstants from 'constants/UserConstants';
import ApiUtils from 'utils/ApiUtils';
import AuthUtils from 'utils/AuthUtils';

class UserActions extends Marty.ActionCreators {
  logIn(user) {
    this.dispatch(UserConstants.LOG_IN_DONE, user);
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

    this.dispatch(UserConstants.LOG_IN_STARTING);
  }

  failLogIn() {
    this.dispatch(UserConstants.LOG_IN_FAILED);
  }

  attemptSignUp(email, username, password) {
  }

  loadUser(user) {
    this.dispatch(UserConstants.GET_USER_DATA_DONE, user);
  }

  getUserData() {
    ApiUtils.getSession(
      AuthUtils.getSessionCookie(),
      user => this.loadUser(user)
    );
    this.dispatch(UserConstants.GET_USER_DATA_STARTING);
  }

  logOut() {
    AuthUtils.deleteSessionCookie();
    this.dispatch(UserConstants.LOG_OUT);
  }
}

export default Marty.register(UserActions);
