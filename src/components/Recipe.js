import React, { Component } from "react";
import { connect } from "react-redux";
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {
  componentWillUnmount() {
    if (this.refs.shipping.checked) this.props.substractShipping();
  }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };

  checkout = () => {
    let close = new window.Close({
      phone: 995082241,
      price:
        this.props.items.reduce((a, c) => a + c.price * c.quantity, 0) + 100,
      products: this.props.items,
      couponVerificationUrl: "https://shop.letsdooit.in/api/verify-coupons",
      redirectUrl: "http://localhost:3000/",
      merchantId: "5eb3fc9ee4cfc1314f26cc6e",
      shippingCharge: 100
    });
    close.checkout();
    close.on("error", err => {
      console.log("err :>> ", err);
    });
  };

  render() {
    console.log("this.props.items", this.props.items);
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+6$)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <div className="checkout">
          <button
            className="waves-effect waves-light btn"
            onClick={this.checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total,
    items: state.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
