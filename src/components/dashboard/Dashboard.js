import React, { Component } from "react";
import Voucher from "../voucher/Voucher";
import Header from "../header/Header";
import { Button } from "react-materialize";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      vouchers: [],
      displayUserVouchers: false
    };
  }

  componentDidMount() {
    console.log("component will mount");
    this.getUser().then(user => {
      console.log('user is: ', user);
      if (user) {
        this.setState({ user });
      }
    });

    this.getAllVouchers().then(response => {
      const vouchers = response;
      console.log(vouchers);
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
    const { voucherid: voucherId, vouchername: voucherName } = e.target.dataset;
    const { user } = this.state;
    var flw_ref = "";
    var PBFKey = "FLWPUBK-5b4184669ccdc431a9be3ed86098f516-X";
    const email = user.email;
    const txRef = "MG-1498408604222";
    const amount = e.target.dataset.amt.slice(1);
    // const firstName = user.displayName.split(" ")[0];
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
            voucherId
          };
          console.log(voucher);
          saveTransaction(voucher);
        } else {
          // redirect to a failure page.
          console.log("transaction failed");
        }
      }
    });
  };

  saveTransaction(voucher) {
    fetch("api/voucher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(voucher)
    }).then(() => window.location.reload());
  }

  showAvailableVouchers() {
    return (
      <section className="voucher-list">
        <h2>Available Vouchers</h2>
        <div className="details">
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
      <div>
          {cartLength ? (
            <section className="voucher-list">
              <h2 style={{textAlign: 'center'}}>Purchased Vouchers</h2>
              <div className="details">
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
            <p>You have no vouchers yet!</p>
          )}
      </div>
    );
  }

  deleteVoucher = e => {
    const { voucherid: id } = e.target.dataset;
    const voucher = this.state.user.vouchers.filter(
      voucher => voucher.id !== id
    )[0];
    console.log("voucher to delete: ", voucher);
    fetch(`voucher/${id}`, {
      method: "DELETE"
    }).then(res => {
      console.log(res);
      window.location.reload();
    });
  };

  toggleUserVoucherDisplay = () => {
    this.setState({ displayUserVouchers: !this.state.displayUserVouchers });
  };

  render() {
    const { user } = this.props;
    const currentVoucherDisplay = this.state.displayUserVouchers
      ? this.showUserVouchers(user.vouchers)
      : this.showAvailableVouchers();
    const toggleButtonContent = this.state.displayUserVouchers
      ? "Available Vouchers"
      : "Purchased Vouchers";
    return (
      <div className="">
        <Header isLoggedIn={true} userVouchers={user.vouchers.length} />
        <section className="details user-details">
          <div className="user-detail-card">
            <span className="user-detail-title">Signed in as : </span>
            {user.username}
          </div>
          <div className="user-detail-card">
            <span className="user-detail-title">Active email : </span>
            {user.email}
          </div>
          <Button onClick={this.toggleUserVoucherDisplay}>
            {toggleButtonContent}
          </Button>
        </section>
        {currentVoucherDisplay}
      </div>
    );
  }
}

export default Dashboard;
