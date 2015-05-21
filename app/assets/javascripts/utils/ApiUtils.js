import $ from 'jquery';

const ApiUtils = {
  getSessionToken(username, password, successCallback, errorCallback) {
    const credentials = { username: username, password: password };

    $.ajax({
      url: '/api/session/',
      method: 'POST',
      data: { credentials: credentials },
      success: response => {
        if (successCallback) {
          successCallback(response.responseJSON);
        }
      },
      error: error => {
        if (errorCallback) {
          errorCallback(error.responseJSON);
        }
      }
    });
  },

  createUser(email, username, password, successCallback, errorCallback) {
    const user = { email: email, username: username, password: password };

    $.ajax({
      url: '/api/users/',
      method: 'POST',
      data: { user: user },
      success: response => {
        if (successCallback) {
          successCallback(response.responseJSON);
        }
      },
      error: error => {
        if (errorCallback) {
          errorCallback(error.responseJSON);
        }
      }
    });
  }
};

export default ApiUtils;
