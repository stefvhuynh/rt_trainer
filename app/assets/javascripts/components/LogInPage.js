import React from 'react';
import ApiUtils from 'utils/ApiUtils';

const LogInPage = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  render() {
    return(
      <div className="RtTrainer">
        <h1>Put in your username and password</h1>
        <form>
          <input type="text" placeholder="username"
            value={ this.state.username }
            onChange={ this._generateInputChangeHandler('username') }/>
          <input type="password" placeholder="password"
            value={ this.state.password }
            onChange={ this._generateInputChangeHandler('password') }/>
          <button onClick={ this._onFormSubmit }>Submit</button>
        </form>
      </div>
    );
  },

  _generateInputChangeHandler(stateKey) {
    let handleChange = event => {
      event.preventDefault();
      this.setState({ [stateKey]: event.target.value });
    };

    return handleChange;
  },

  _onFormSubmit(event) {
    event.preventDefault();
    ApiUtils.getSessionToken(
      this.state.username,
      this.state.password,
      response => console.log(response),
      error => console.log('error: ', error)
    );
  }
});

export default LogInPage;
