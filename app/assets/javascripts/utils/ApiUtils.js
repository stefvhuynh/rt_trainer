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
  }
};

export default ApiUtils;
