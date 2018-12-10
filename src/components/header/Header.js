import React, { Component } from 'react';
import { Button } from 'react-materialize';
import './header.css';

class Header extends Component {

  handleLogout = () => {
    fetch('api/logout').then(res => {
      window.location.reload();
    })
  }

  render() {
    const logoutButton = this.props.isLoggedIn 
     ? <Button className="logout-btn purple" onClick={this.handleLogout}>Logout</Button>
     : '';
    return (
      <div>
        <header className={this.props.isLoggedIn ? 'header' : 'header__banner'}>
        <a 
          href={'/'}
          className="banner" 
        >
          E-Voucher Pay
        </a>
          {logoutButton}
      </header>
      </div>
    );
  }
  
}

export default Header;