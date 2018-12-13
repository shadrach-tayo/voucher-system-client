import React, { Component } from "react";
import Voucher from "../voucher/Voucher";
import Header from "../header/Header";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      vouchers: [],
      displayUserVouchers: false
    };

    this.getUser = this.getUser.bind(this);
    this.payWithRave = this.payWithRave.bind(this);
    this.deleteVoucher = this.deleteVoucher.bind(this);
    this.getAllVouchers = this.getAllVouchers.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.showUserVouchers = this.showUserVouchers.bind(this);
    this.showAvailableVouchers = this.showAvailableVouchers.bind(this);
  }

  componentDidMount() {
    this.getUser().then(user => {
      if (user) {
        this.setState({ user });
        // set document title to display username
        document.title = `Voucher System | ${user.username}`;
      }
    });

    this.getAllVouchers().then(response => {
      const vouchers = response;
      this.setState(state => ({
        ...state,
        ...vouchers
      }));
    });
  }

  getUser = () => {
    return fetch("/api/current_user", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => {
      console.log(res);
      if(res.status === 204) return null
      return res.json();
    })
    .catch(err => console.log("user not loggedIn: ", err));
  };

  getAllVouchers = () => {
    return fetch("api/vouchers")
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  payWithRave = e => {
    const {
      voucherid: voucherId,
      vouchername: voucherName,
      url: imageurl
    } = e.target.dataset;
    const { user } = this.state;
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
        flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
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
      .then(({ user }) => {
        window.location.reload();
      });
  }

  showAvailableVouchers() {
    return (
      <section className="voucher-contain">
        <div className="voucher-filter"></div>
        <div className="voucher-list">
          {this.state.vouchers.map((voucher, i) => {
            return (
              <Voucher key={i} voucher={voucher} click={this.payWithRave} />
            );
          })}
        </div>
      </section>
    );
  }

  showUserVouchers(vouchers) {
    const cartLength = vouchers.length;
    return (
      <div className="voucher-contain">
        {cartLength ? (
          <section className="voucher-list">
            {/* <h2 style={{ textAlign: "center" }}>Purchased Vouchers</h2> */}
            <div className="voucher-list">
              {vouchers.map((voucher, i) => {
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
          </section>
        ) : (
          <h2>You have no vouchers yet!</h2>
        )}
      </div>
    );
  }

  deleteVoucher = e => {
    const { voucherid: id } = e.target.dataset;
    fetch(`voucher/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
    const { user } = this.props;
    const currentVoucherDisplay = this.state.displayUserVouchers
      ? this.showUserVouchers(user.vouchers)
      : this.showAvailableVouchers();
    return (
      <div className="">
        <Header isLoggedIn={true} userDisplay={user.email} cartLength={user.vouchers.length} showCart={this.toggleUserVoucherDisplay}/>
        <main className="contain">
            {currentVoucherDisplay}
        </main>
      </div>
    );
  }
}

export default Dashboard;
