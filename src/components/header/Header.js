import React, { Component } from 'react';
import { Button, Badge } from 'react-materialize';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const logoutButton = this.props.isLoggedIn 
     ? <Button className="logout-btn purple" onClick={() => window.location = `${window.location.href}api/logout`}>Logout</Button>
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