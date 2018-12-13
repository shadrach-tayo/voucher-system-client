import React, { Component } from 'react';
import { Button } from 'react-materialize';
import './header.css';
import logo from '../../images/logo-small.jpg';

class Header extends Component {

  handleLogout = () => {
    console.log('logging out')
    fetch('api/logout').then(res => {
      window.location.reload();
    })
  }

  render() {
    const displayName = this.props.userDisplay;
    const logoutButton = this.props.isLoggedIn
     ? <Button className="purple" onClick={this.handleLogout}>Sign out</Button>
     : '';
    const userProps = this.props.isLoggedIn ?
      (
        <div className="header__right">
          <div className="user-action user-display" tabIndex={0}>
            <span className="user-action__name">{displayName}</span>
            <div className="user-action__dropdown" tabIndex="0">
              {logoutButton}
            </div>
          </div>
          <div className="user-action signout__btn" tabIndex={0}>
            {logoutButton}
          </div>
          <button className="user-action cart-avatar" onClick={this.props.showCart}>
            <span className="cart-figure">{this.props.cartLength}</span>
          </button>
        </div>
      ) : '';
    return (
      <div>
        <header className={this.props.isLoggedIn ? 'header' : 'header__banner'}>
        <div className="header__left">
          <a 
            href={'/'}
            className="banner" 
          >
            E-Voucher Pay
          </a>
          <img 
            src={logo}
            alt="logo"
            className="logo" 
          />
        </div>
        {userProps}
      </header>
      </div>
    );
  }
  
}

export default Header;