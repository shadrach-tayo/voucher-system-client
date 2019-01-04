import React, { Component } from "react";
import { history } from "../../App";
import { UserConsumer } from "../../UserContext";
import "./header.css";
import logo from "../../images/logo-small.jpg";
import dropArrow from "../../images/down-arrow.svg";
import { history } from "../../App";

class Header extends Component {
  handleLogout = onLogout => {
    fetch("api/logout").then(res => {
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
                <a href={"/"} className="banner">
                  E-Voucher Pay
                </a>
                <img src={logo} alt="logo" className="logo" />
              </div>
              {isAuth ? (
                <div className="header__right">
                  <div className="user-action user-display" tabIndex={0}>
                    <span className="user-action__name">{user.email}</span>
                    <div className="user-action__dropdown" tabIndex="0">
                      {isAuth ? (
                        <button
                          className="btn voucher-btn"
                          onClick={() => this.handleLogout(onLogout)}
                        >
                          Sign out
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="user-action dropdown" tabIndex={0}>
                    {isAuth ? (
                      <button
                        className="btn voucher-btn"
                        onClick={() => this.handleLogout(onLogout)}
                      >
                        Sign out
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    className="user-action cart-avatar"
                    onClick={this.props.showCart}
                  >
                    <span className="cart-figure">{user.vouchers.length}</span>
                  </button>
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
