import React, { Fragment } from "react";
import Header from "../header/Header";
import { UserConsumer } from "../../UserContext";
import "./cart.css";

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

const CartItem = ({ cartitem }) => {
  return (
    <div className="cartitem">
      <div className="cartitem--details">
        <h5>{cartitem.item.name}</h5>
        <p>{`${cartitem.item.price} x ${cartitem.quantity}`}</p>
        <p>
          Total for this voucher:{" "}
          <strong>{`${Number(cartitem.item.price.slice(1)) *
            cartitem.quantity}`}</strong>
        </p>
      </div>
      <img
        className="cartitem--avatar"
        src={images[cartitem.item.imageurl]}
        alt={cartitem.item.name}
      />
    </div>
  );
};

const Cart = () => {
  return (
    <Fragment>
      <Header />
      <UserConsumer>
        {({ user, purchaseCart }) => (
          <div className="cart--container">
            {user.cart.length ? (
              <div className="cartlist">
                {user.cart.map(cartitem => {
                  return <CartItem key={cartitem._id} cartitem={cartitem} />;
                })}
                <h4>
                  Total:{" "}
                  {`${user.cart.reduce((sum, voucher) => {
                    sum =
                      Number(sum) +
                      Number(voucher.quantity) *
                        Number(voucher.item.price.slice(1));
                    return sum;
                  }, 0)}`}
                </h4>
                <button
                  className="voucher-btn"
                  onClick={e => purchaseCart(user.cart)}
                >
                  Purchase
                </button>
              </div>
            ) : (
              <h2>Your cart is empty yet!</h2>
            )}
          </div>
        )}
      </UserConsumer>
    </Fragment>
  );
};

export default Cart;
