import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    let currentDisplay = this.props.isLoggedIn 
     ? <Button className="logout-btn" onClick={() => window.location = `${window.location.href}api/logout`}>Logout</Button>
     : '';
    return (
      <div>
        <header>
        <Link 
          to={'/'}
          className="banner" 
        >
          Voucher Pay
        </Link>
          {currentDisplay}
      </header>
      </div>
    );
  }
  
}

export default Header;