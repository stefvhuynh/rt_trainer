import Marty from 'marty';
import UserConstants from 'constants/UserConstants';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.userId;
    this.username;
    this.email;
    this.level;
    this.session;

    this.handlers = {
      loadUser: [UserConstants.LOG_IN_DONE, UserConstants.GET_USER_DATA_DONE],
      logOut: UserConstants.LOG_OUT
    };
  }

  loadUser(user) {
    this.userId = user.id;
    this.username = user.username;
    this.email = user.email;
    this.level = user.level;
    this.session = user.session;
    this.hasChanged();
  }

  hasLoadedUser() {
    if (this.userId) {
      return true;
    }

    return false;
  }

  logOut() {
    this.userId = null;
    this.username = null;
    this.email = null;
    this.level = null;
    this.session = null;
    this.hasChanged();
  }

  getUser() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
      level: this.level,
      session: this.session
    };
  }
}

export default Marty.register(UserStore);
