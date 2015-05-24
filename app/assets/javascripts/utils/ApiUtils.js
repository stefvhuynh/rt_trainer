import $ from 'jquery';
import ChangeCase from 'change-case';

const ApiUtils = {
  createSession(username, password, successCallback, errorCallback) {
    const credentials = { username: username, password: password };

    this.makeAjaxRequest(
      '/api/session/',
      'POST',
      { credentials: credentials },
      successCallback,
      errorCallback
    );
  },

  createUser(email, username, password, successCallback, errorCallback) {
    const user = { email: email, username: username, password: password };

    this.makeAjaxRequest(
      '/api/users/',
      'POST',
      { user: user },
      successCallback,
      errorCallback
    );
  },

  makeAjaxRequest(url, method, data, successCallback, errorCallback) {
    const normalizedMethod = ChangeCase.upperCase(method);

    $.ajax({
      url: url,
      method: normalizedMethod,
      data: data,
      success: response => {
        if (successCallback) {
          const successObj = this.convertObjToCamelCase(response);
          successCallback(successObj);
        }
      },
      error: error => {
        if (errorCallback) {
          const errorObj = this.convertToCamelCase(error.responseJSON);
          errorCallback(errorObj);
        }
      }
    });
  },

  convertObjToCamelCase(obj) {
    return this.convertObjToCase(obj, 'camelCase');
  },

  convertObjToSnakeCase(obj) {
    return this.convertObjToCase(obj, 'snakeCase');
  },

  convertObjToCase(obj, casing) {
    let normalizedCasing = ChangeCase.camelCase(casing);
    let newObj = {};

    Object.keys(obj).forEach(key =>
      newObj[ChangeCase[normalizedCasing](key)] =
        (typeof obj[key] === 'object') ?
          this.convertObjToCase(obj[key], normalizedCasing) : obj[key]
    );

    return newObj;
  }
};

export default ApiUtils;
