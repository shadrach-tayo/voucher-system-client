import React, { Component } from 'react';
import { Button, Badge } from 'react-materialize';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    // fetch('/api/logout').then((res) => {
    //   console.log(res);
    //   window.location.pathname = '/';
    // })
    window.location.pathname = 'api/logout';
  }

  render() {
    const logoutButton = this.props.isLoggedIn 
     ? <Button className="logout-btn purple" onClick={this.handleLogout}>Logout</Button>
     : '';
    return (
      <div>
        <header>
        <a 
          href={'/'}
          className="banner" 
        >
          Voucher Pay
        </a>
          {logoutButton}
      </header>
      </div>
    );
  }
  
}

export default Header;