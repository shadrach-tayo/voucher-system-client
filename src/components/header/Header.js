import React, { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../App";
import { UserConsumer } from "../../UserContext";
import "./header.css";
import logo from "../../images/logo-small.jpg";

class Header extends Component {
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
                  <Link
                    to="/cart"
                    className="user-action cart-avatar"
                    // onClick={this.props.showCart}
                  >
                    <span className="cart-figure">{user.cart.length}</span>
                  </Link>
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
