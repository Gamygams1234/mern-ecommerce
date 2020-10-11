import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllOrders } from "../../actions/auth";
import { Link } from "react-router-dom";
import moment from "moment";

const UserOrders = ({ getAllOrders, userID, token, orders }) => {
  useEffect(() => {
    getAllOrders(userID, token);
  }, [getAllOrders]);

  const userOrders = orders.filter(function (order) {
    return order.user._id === userID;
  });

  const orderCard = () => (
    <div>
      {userOrders.map((order, i) => (
        <div className="card mb-5" key={i}>
          <h5 className="card-header">Order # {order._id}</h5>
          <div className="card-body">
            <h5 className="card-title">User: {order.user.name}</h5>
            <p className="card-text">Amount: {order.amount}</p>
            <p className="card-text">Products: {order.products.length}</p>
            <p class="card-text"> Ordered on: {moment(order.createdAt).fromNow()}</p>
            <Link to={`/user/orders/${order._id}`} className="mr-2">
              <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Order</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="">
        <h1 className="display-4">View Orders</h1>
        <p className="lead">There are {userOrders.length} orders.</p>
      </div>
      {orderCard()}
    </div>
  );
};

UserOrders.propType = {
  getAllOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  orders: state.auth.orders,
  userID: state.auth.user._id,
});

export default connect(mapStateToProps, { getAllOrders })(UserOrders);
