import React, { Component } from "react";
import { history } from "./App";

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuth: false,
      loading: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
      addToCart: this.addToCart,
      purchaseCart: this.purchaseCart
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUser()
      .then(user => {
        console.log(user);
        this.setState({ user, isAuth: true, loading: false });
      })
      .catch(err => {
        console.log("loggin error: ", err);
        this.setState({ loading: false, isAuth: false, user: null });
      });
  }

  onLogout = () => {
    this.setState({ user: null, isAuth: false });
    history.push("/");
  };

  onLogin = () => {
    this.setState({ loading: true });
    this.getUser()
      .then(user => {
        this.setState({ user, isAuth: true, loading: false });
      })
      .catch(err => {
        console.log("loggin error: ", err);
        this.setState({ isAuth: false, loading: false });
      });
  };

  getUser = () => {
    return fetch("api/current_user", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(res => res.json());
  };

  addToCart = cartItem => {
    return fetch("api/addToCart", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      body: JSON.stringify(cartItem)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Could not add item to cart");
      })
      .then(({ success, user }) => {
        if (success) {
          this.setState({ user });
          console.log(user);
        }
      })
      .catch(error => console.log(error));
  };

  purchaseCart = itemList => {
    let total = itemList.reduce((sum, voucher) => {
      sum =
        Number(sum) +
        Number(voucher.quantity) * Number(voucher.item.price.slice(1));
      return sum;
    }, 0);
    itemList = itemList.map(cartItem => ({ ...cartItem.item }));
    return this.payWithRave(total, itemList);
  };

  saveTransaction = items => {
    return fetch("api/voucher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.getUser().then(user => {
          console.log("user: ", user);
          this.setState({ user });
        });
      })
      .catch(error => console.error(error));
  };

  payWithRave = (amount, list) => {
    var flw_ref = "";
    var PBFKey = "FLWPUBK-5b4184669ccdc431a9be3ed86098f516-X";
    const email = this.state.user.email;
    const txRef = "MG-1498408604222";
    const firstName = this.state.user.username;
    const lastName = this.state.user.username;
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
          saveTransaction(list);
        } else {
          // redirect to a failure page.
          console.log("transaction failed");
        }
      }
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children};</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
