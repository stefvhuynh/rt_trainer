import UserConstants from 'constants/UserConstants';

const UserActions = {
  loadUser: function(user) {
    this.dispatch(UserConstants.LOAD_USER, { user: user });
  }
};

export default UserActions;
