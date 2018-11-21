import React from 'react';
import { Button } from 'react-materialize';
import voucherImage from '../../images/voucher-image.jpg';
import './voucher.css';
import '../dashboard/dashboard.css';

class Voucher extends React.Component {
  constructor(props) {
    super(props);
  }

  renderVoucher(voucher = this.props.voucher) {
    return (
      <div className="detail-card" aria-label={voucher.name}>
        <img className="voucher-image" src={voucherImage} alt={voucher.name}/>
        <h4 className="voucher-name">{voucher.name}</h4>
        <p className="voucher-price">{voucher.price}</p>
        <button className="voucher-btn" data-voucherid={voucher.id} data-amt={voucher.price} data-vouchername={voucher.name} onClick={this.props.click}>Buy Now</button>
      </div>
    );
  }
  
  renderAsDeletable(voucher = this.props.voucher) {
    return (
      <div className="detail-card" aria-label={voucher.name}>
        <img className="voucher-image" src={voucherImage} alt={voucher.name}/>
        <h4 className="voucher-name">{voucher.name}</h4>
        <h4 className="voucher-price">Amount: {voucher.amount}</h4>
        <h4 className="voucher-price">Code: {voucher.id}</h4>
        <Button className="voucher-btn red" data-voucherid={voucher.id} onClick={this.props.onDelete}>Delete</Button>
      </div>
    )
  }
  
  render() {
    const { isDeletable } = this.props;
    const currentDisplay = isDeletable ? this.renderAsDeletable() : this.renderVoucher();
    return (
      <div>
        {currentDisplay}
      </div>
    )
  }
}

export default Voucher;