import React from 'react';
import ApiUtils from 'utils/ApiUtils';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

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
      <main className="LogIn">
        <h1>Log in</h1>
        <form>
          <input type="text" placeholder="username"
            value={ this.state.existingUsername }
            onChange={ this._generateInputChangeHandler('existingUsername') }/>
          <input type="password" placeholder="password"
            value={ this.state.existingPassword }
            onChange={ this._generateInputChangeHandler('existingPassword') }/>
          <button onClick={ this._onLogInFormSubmit() }>Submit</button>
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
          <button onClick={ this._onSignUpFormSubmit() }>Submit</button>
        </form>
      </main>
    );
  }

  _generateInputChangeHandler(stateKey) {
    const handleChange = event => {
      event.preventDefault();
      this.setState({ [stateKey]: event.target.value });
    };

    return handleChange;
  }

  _onLogInFormSubmit() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.attemptLogIn(
        this.state.existingUsername,
        this.state.existingPassword
      );
    };

    return boundFn;
  }

  _onSignUpFormSubmit() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.attemptSignUp(
        this.state.newEmail,
        this.state.newUsername,
        this.state.newPassword
      );
    };

    return boundFn;
  }
}

export default LogIn;
