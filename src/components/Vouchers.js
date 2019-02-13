import React, { Fragment } from "react";
import Header from "./header/Header";
import Voucher from "./voucher/Voucher";
import { UserConsumer } from "../UserContext";

const Vouchers = () => (
  <Fragment>
    <Header />
    <UserConsumer>
      {({ user, onDelete }) => (
        <div className="wrapper">
          <div className="app--container" style={{ marginBottom: "0px" }}>
            <div className="voucher-list">
              {user.vouchers ? (
                user.vouchers.map((voucher, i) => (
                  <Voucher
                    key={i}
                    isDeletable={true}
                    voucher={voucher}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <div>You have no vouchers yet!</div>
              )}
            </div>
          </div>
        </div>
      )}
    </UserConsumer>
  </Fragment>
);

export default Vouchers;
