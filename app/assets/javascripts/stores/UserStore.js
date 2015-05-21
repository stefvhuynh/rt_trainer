import Fluxxor from 'fluxxor';
import UserConstants from 'constants/UserConstants';

const UserStore = Fluxxor.createStore({
  initialize() {
    this.username = '';
    this.level = 1;
    this.session = 1;

    this.bindActions(
      UserConstants.LOAD_USER, this.onLoadUser
    );
  },

  loadUser(user) {
    this.username = user.username;
    this.level = user.level;
    this.session = user.session;
    this.emit('change');
  },

  getState() {
    return {
      username: this.username,
      level: this.level,
      session: this.session
    };
  }
});

export default UserStore;
