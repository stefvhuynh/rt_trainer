import Marty from 'marty'

const UserConstants = Marty.createConstants([
  'LOG_IN',
  'SIGN_UP',
  'LOG_OUT',
  'GET_USER_DATA',
  'UPDATE_LEVEL',
  'UPDATE_SESSION'
]);

export default UserConstants;
