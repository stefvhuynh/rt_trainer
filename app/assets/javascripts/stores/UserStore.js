import Marty from 'marty';
import UserConstants from 'constants/UserConstants';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.id;
    this.username;
    this.email;
    this.level;
    this.session;

    this.handlers = {
      logIn: UserConstants.LOG_IN
    };
  }

  logIn(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.level = user.level;
    this.session = user.session;
    this.hasChanged();
  }

  getUser() {
    return {
      username: this.username,
      email: this.email,
      level: this.level,
      session: this.session
    };
  }

  hasLoadedUser() {
    if (this.id) {
      return true;
    }

    return false;
  }
}

export default Marty.register(UserStore);
