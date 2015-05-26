const AuthUtils = {
  SESSION_COOKIE_NAME: 'rt_trainer_session_token',

  isLoggedIn() {
    // TODO: Make a more solid check with the server?
    return this.getSessionCookie() ? true : false;
  },

  setSessionCookie(value) {
    this.setCookie(this.SESSION_COOKIE_NAME, value);
  },

  getSessionCookie() {
    return this.readCookie(this.SESSION_COOKIE_NAME);
  },

  deleteSessionCookie() {
    this.deleteCookie(this.SESSION_COOKIE_NAME);
  },

  setCookie(name, value) {
    document.cookie = `${name}=${value};`;
  },

  readCookie(name) {
    const nameEq = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(nameEq) == 0) {
        return cookie.substring(nameEq.length, cookie.length);
      }
    }

    return null;
  },

  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
};

export default AuthUtils;
