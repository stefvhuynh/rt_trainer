import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import Bootstrap from 'react-bootstrap';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

const { Link } = Router;
const { Navbar, Nav, NavItem } = Bootstrap;

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navbar className="Header" brand="RT Trainer" staticTop>
        <Nav>
          <NavItem href={ this.context.router.makeHref('root') }>
            Dashboard
          </NavItem>
          <NavItem href={ this.context.router.makeHref('trainer') }>
            Trainer
          </NavItem>
        </Nav>
        <Nav right>
          <NavItem right onClick={ this._onLogOutClick() }>Log Out</NavItem>
        </Nav>
      </Navbar>
    );
  }

  _onLogOutClick() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.logOut();
    }

    return boundFn;
  }
}

Header.contextTypes = { router: React.PropTypes.func.isRequired };

export default Marty.createContainer(Header, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.getUser();
    }
  }
});
