import React, { Component } from "react";

const { Provider, Consumer } = React.createContext(null);

class VoucherContext extends Component {
  state = {
    vouchers: []
  };

  componentDidMount() {
    this.getAllVouchers().then(({ vouchers }) => {
      this.setState({ vouchers });
    });
  }

  getAllVouchers = () => {
    return fetch("api/vouchers")
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { VoucherContext as VoucherProvider, Consumer as VoucherConsumer };
