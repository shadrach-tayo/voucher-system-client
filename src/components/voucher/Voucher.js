import React, { Fragment } from "react";
import fallbackImage from "../../images/voucher-image.jpg";
import "./voucher.css";
import "../dashboard/dashboard.css";
import { UserConsumer } from "../../UserContext";

function importAll(r) {
  let images = {};
  r.keys().map(item => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

class Voucher extends React.Component {
  constructor(props) {
    super(props);
    this.image = images[`${this.props.voucher.imageurl}`] || fallbackImage;
  }

  renderVoucher(voucher = this.props.voucher) {
    return (
      <UserConsumer>
        {({ user, addToCart }) => (
          <div className="voucher-card" aria-label={voucher.name}>
            <img
              className="voucher-image"
              src={this.image}
              alt={voucher.name}
            />
            <h4 className="voucher-name">{voucher.name}</h4>
            <p className="voucher-price">{voucher.price}</p>
            <button
              className="voucher-btn"
              data-voucherid={voucher.id}
              data-amt={voucher.price}
              data-url={voucher.imageurl}
              data-vouchername={voucher.name}
              onClick={e => addToCart(voucher)}
            >
              ADD ITEM
            </button>
          </div>
        )}
      </UserConsumer>
    );
  }

  renderAsDeletable(voucher = this.props.voucher) {
    return (
      <div className="voucher-card" aria-label={voucher.name}>
        <img
          className="voucher-image"
          src={images[`${voucher.imageurl}`]}
          alt={voucher.name}
        />
        <h4 className="voucher-name">{voucher.name}</h4>
        <h4 className="voucher-price">Code: {voucher.id}</h4>
        <button
          className="voucher-btn delete-btn"
          data-voucherid={voucher.id}
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }

  render() {
    const { isDeletable } = this.props;
    const currentDisplay = isDeletable
      ? this.renderAsDeletable()
      : this.renderVoucher();
    return <Fragment>{currentDisplay}</Fragment>;
  }
}

export default Voucher;
