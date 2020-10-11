import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ user }) => {
  const AdminLinks = (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
            View Orders
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );

  const userLinks = (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/user/orders`}>
            View Orders
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <div className="container mb-4">
      <div className="jumbotron">
        <h1 className="display-4">This is the Dashboard</h1>
        <p className="lead">Thanks for coming to my store to check out some of the products.</p>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-5 order-2">{user.role !== 0 ? AdminLinks : userLinks}</div>
        <div className="col-lg-9 col-md-7 order-1 order-md-3 ">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">Username: {user.name}</li>
              <li className="list-group-item">Email: {user.email}</li>
              <li className="list-group-item">User Role: {user.role === 1 ? "Admin" : "Registered User"}</li>
            </ul>
          </div>
        </div>
        {/*End of right Side */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Dashboard);
