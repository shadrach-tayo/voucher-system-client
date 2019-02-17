import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { history } from "../../App";
import { UserConsumer } from "../../UserContext";
import "./header.css";
import logo from "../../images/logo-small.jpg";
import userAvatar from "../../images/user.svg";
import dropArrow from "../../images/drop-down-arrow.svg";

class Header extends Component {
  state = {
    menuIsOpened: false
  };

  toggleMenu = () => {
    this.setState({ menuIsOpened: !this.state.menuIsOpened });
    this.state.menuIsOpened
      ? this.menu.classList.add("opened")
      : this.menu.classList.remove("opened");
  };

  handleLogout = onLogout => {
    fetch("api/logout").then(res => {
      console.log(res);
      onLogout();
      history.push("/");
    });
  };

  render() {
    return (
      <UserConsumer>
        {({ isAuth, user, onLogout }) => (
          <header className={isAuth ? "header" : "header__banner"}>
            <div className="header--container">
              <div className="header__left">
                <Link to="/" className="banner">
                  E-Voucher Pay
                </Link>
                <img src={logo} alt="logo" className="logo" />
              </div>
              {isAuth ? (
                <div className="header__right">
                  <Link to="/cart" className="user-action cart-avatar">
                    <span className="cart-figure">{user.cart.length}</span>
                  </Link>
                  <div className="user-menu">
                    <button
                      className="user-menu__icons"
                      onClick={this.toggleMenu}
                      id="user-menu__icons"
                    >
                      <img
                        src={userAvatar}
                        alt="user avatar"
                        className="user-menu__avatar"
                      />

                      <img
                        src={dropArrow}
                        alt="dropdown icon"
                        className="user-menu__dropdown-icon"
                      />
                    </button>
                    <div
                      className="user-menu__dropdown"
                      ref={el => (this.menu = el)}
                    >
                      <ul>
                        <li className="user-menu__dropdown-item">
                          <Link to="/vouchers">vouchers</Link>
                        </li>
                        <li
                          className="user-menu__dropdown-item"
                          onClick={() => this.handleLogout(onLogout)}
                        >
                          Sign out
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </header>
        )}
      </UserConsumer>
    );
  }
}

export default Header;
