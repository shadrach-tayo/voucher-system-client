import React, { Component, Fragment } from "react";
import Voucher from "../voucher/Voucher";
import Header from "../header/Header";
import { UserConsumer } from "../../UserContext";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchers: [],
      displayUserVouchers: false
    };

    this.deleteVoucher = this.deleteVoucher.bind(this);
    this.getAllVouchers = this.getAllVouchers.bind(this);
    this.showUserVouchers = this.showUserVouchers.bind(this);
    this.showAvailableVouchers = this.showAvailableVouchers.bind(this);
  }

  componentDidMount() {
    this.getAllVouchers().then(response => {
      const vouchers = response;
      this.setState(state => ({
        ...state,
        ...vouchers
      }));
    });
  }

  getAllVouchers = () => {
    return fetch("api/vouchers")
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  showAvailableVouchers() {
    return (
      <section className="voucher-contain">
        <div className="voucher-list">
          {this.state.vouchers.map((voucher, i) => {
            return (
              <Voucher
                key={i}
                voucher={voucher}
                payWithRave={this.payWithRave}
              />
            );
          })}
        </div>
      </section>
    );
  }

  showUserVouchers() {
    return (
      <UserConsumer>
        {({ user }) => (
          <div className="voucher-contain">
            {user.vouchers.length ? (
              <div className="voucher-list">
                {user.vouchers.map((voucher, i) => {
                  return (
                    <Voucher
                      key={i}
                      voucher={voucher}
                      isDeletable={true}
                      onDelete={this.deleteVoucher}
                    />
                  );
                })}
              </div>
            ) : (
              <h2>You have no vouchers yet!</h2>
            )}
          </div>
        )}
      </UserConsumer>
    );
  }

  deleteVoucher = e => {
    const { voucherid: id } = e.target.dataset;
    fetch(`voucher/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return window.location.reload();
        }
      })
      .catch(err => console.error(err));
  };

  toggleUserVoucherDisplay = () => {
    this.setState({ displayUserVouchers: !this.state.displayUserVouchers });
  };

  render() {
    const currentVoucherDisplay = this.state.displayUserVouchers
      ? this.showUserVouchers()
      : this.showAvailableVouchers();
    return (
      <Fragment>
        <Header showCart={this.toggleUserVoucherDisplay} />
        <div className="wrapper">
          <main className="contain">{currentVoucherDisplay}</main>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
