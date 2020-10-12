import React from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import moment from "moment";

const Order = ({ orders }) => {
  let { order_id } = useParams();

  // filtering the single order by ID
  var featuredOrder = orders.filter(function (order) {
    return order._id === order_id;
  });
  featuredOrder = featuredOrder[0];
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md col-xl-7 mb-4">
          <h2 className="mb-4">Order # {featuredOrder._id}</h2>

          <ul className="list-group">
            <li className="list-group-item">Transaction ID: {featuredOrder.transaction_id}</li>
            <li className="list-group-item">Total amount: ${featuredOrder.amount}</li>
            <li className="list-group-item">Ordered by: {featuredOrder.user.name}</li>
            <li className="list-group-item"> Ordered: {moment(featuredOrder.createdAt).fromNow()}</li>
            <li className="list-group-item">
              <h5>Address:</h5>
              <p>{featuredOrder.address.address1}</p>
              {featuredOrder.address.address2 !== "" ? <p>{featuredOrder.address.address2}</p> : null}
              <p>
                {featuredOrder.address.city}, {featuredOrder.address.state} {featuredOrder.address.zip}
              </p>
            </li>
          </ul>
        </div>
        <div className="col-md col-xl-3 ml-auto ">
          <h2>Order Products</h2>

          {featuredOrder
            ? featuredOrder.products.map((product, i) => (
                <div className="card mb-3" key={i}>
                  <div className="card-body">
                    <img src={`/api/products/photo/${product.product._id}`} className="card-img-top" alt="..." />
                    <h5 className="card-title">{product.product.name}</h5>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">$ {product.product.price}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.auth.orders,
});

export default connect(mapStateToProps)(Order);
