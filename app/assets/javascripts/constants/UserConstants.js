import Marty from 'marty'

const UserConstants = Marty.createConstants([
  'ATTEMPT_LOG_IN',
  'LOG_IN',
  'FAIL_LOG_IN',
  'UPDATE_LEVEL',
  'UPDATE_SESSION'
]);

export default UserConstants;
