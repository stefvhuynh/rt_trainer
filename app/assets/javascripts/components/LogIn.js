import React from 'react';
import ApiUtils from 'utils/ApiUtils';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingUsername: '',
      existingPassword: '',
      newEmail: '',
      newUsername: '',
      newPassword: ''
    };
  }

  render() {
    return(
      <div className="LogIn">
        <h1>Log in</h1>
        <form>
          <input type="text" placeholder="username"
            value={ this.state.existingUsername }
            onChange={ this._generateInputChangeHandler('existingUsername') }/>
          <input type="password" placeholder="password"
            value={ this.state.existingPassword }
            onChange={ this._generateInputChangeHandler('existingPassword') }/>
          <button onClick={ this._onLogInFormSubmit.bind(this) }>Submit</button>
        </form>

        <h1>Sign up</h1>
        <form>
          <input type="text" placeholder="email"
            value={ this.state.newEmail }
            onChange={ this._generateInputChangeHandler('newEmail') }/>
          <input type="text" placeholder="username"
            value={ this.state.newUsername }
            onChange={ this._generateInputChangeHandler('newUsername') }/>
          <input type="password" placeholder="password"
            value={ this.state.newPassword }
            onChange={ this._generateInputChangeHandler('newPassword') }/>
          <button onClick={ this._onSignUpFormSubmit.bind(this) }>Submit</button>
        </form>
      </div>
    );
  }

  _generateInputChangeHandler(stateKey) {
    const handleChange = event => {
      event.preventDefault();
      this.setState({ [stateKey]: event.target.value });
    };

    return handleChange;
  }

  _onLogInFormSubmit(event) {
    event.preventDefault();
    ApiUtils.getSessionToken(
      this.state.existingUsername,
      this.state.existingPassword,
      response => console.log(response),
      error => console.log('error: ', error)
    );
  }

  _onSignUpFormSubmit(event) {
    event.preventDefault();
    ApiUtils.createUser(
      this.state.newEmail,
      this.state.newUsername,
      this.state.newPassword,
      response => console.log(response),
      error => console.log('error: ', error)
    );
  }
}

export default LogIn;
