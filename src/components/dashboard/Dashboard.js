import React, { Component, Fragment } from "react";
import Voucher from "../voucher/Voucher";
import Header from "../header/Header";
import { UserContext } from "../../index";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      vouchers: [],
      displayUserVouchers: false
    };

    this.payWithRave = this.payWithRave.bind(this);
    this.deleteVoucher = this.deleteVoucher.bind(this);
    this.getAllVouchers = this.getAllVouchers.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
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

  payWithRave = (e, user) => {
    const {
      voucherid: voucherId,
      vouchername: voucherName,
      url: imageurl
    } = e.target.dataset;
    var flw_ref = "";
    var PBFKey = "FLWPUBK-5b4184669ccdc431a9be3ed86098f516-X";
    const email = user.email;
    const txRef = "MG-1498408604222";
    const amount = e.target.dataset.amt.slice(1);
    const firstName = user.username;
    const lastName = user.username;
    let saveTransaction = this.saveTransaction;
    window.getpaidSetup({
      PBFPubKey: PBFKey,
      customer_email: email,
      customer_firstname: `${firstName}`,
      customer_lastname: `${lastName}`,
      amount: amount,
      customer_phone: "",
      country: "NG",
      currency: "NGN",
      txref: txRef, // Pass your UNIQUE TRANSACTION REFERENCE HERE.
      //integrity_hash: hashedValue, // pass the sha256 hashed value here.
      onclose: function() {},
      callback: function(response) {
        flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a server page to complete status check.
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode == "00" ||
          response.tx.chargeResponseCode == "0"
        ) {
          const voucher = {
            amount: response.tx.amount,
            id: response.tx.id,
            name: voucherName,
            voucherId,
            imageurl
          };
          saveTransaction(voucher);
        } else {
          // redirect to a failure page.
          console.log("transaction failed");
        }
      }
    });
  };

  saveTransaction(voucher) {
    return fetch("api/voucher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(voucher)
    })
      .then(res => res.json())
      .then(() => {
        window.location.reload();
      });
  }

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
      <UserContext.Consumer>
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
      </UserContext.Consumer>
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
      <UserContext.Consumer>
        {({ user, onLogout, isAuth }) => (
          <Fragment>
            <Header
              isLoggedIn={isAuth}
              onLogout={onLogout}
              userDisplay={user.email}
              cartLength={user.vouchers.length}
              showCart={this.toggleUserVoucherDisplay}
            />
            <div className="wrapper">
              <main className="contain">{currentVoucherDisplay}</main>
            </div>
          </Fragment>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;
