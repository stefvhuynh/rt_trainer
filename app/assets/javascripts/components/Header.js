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
      <Navbar className="Header">
        <Nav>
          <NavItem href="#/">Dashboard</NavItem>
          <NavItem href="#/trainer">Trainer</NavItem>
          <NavItem onClick={ this._onLogOutClick() }>Log Out</NavItem>
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

export default Marty.createContainer(Header, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.getUser();
    }
  }
});
