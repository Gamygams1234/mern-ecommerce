import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, getNewProducts } from "./actions/products";

import axios from "axios";

const Home = ({ products, getProducts, newProducts, getNewProducts }) => {
  useEffect(() => {
    getProducts();
    getNewProducts();
  }, []);

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">Thanks for coming to my store to check out some of the products.</p>
        <hr className="my-4"></hr>
        <p>Let's Sign in to get started.</p>
        <Link className="btn btn-primary btn-lg" to="/sign-in" role="button">
          Sign In
        </Link>
      </div>
      <hr className="my-4"></hr>
      <div className="row row-cols-1 row-cols-md-3 container">
        {products.map((product, i) => (
          <div className="col mb-4" key={i}>
            <div className="card h-100">
              <img src={`/api/products/photo/${product._id}`} class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">$ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*the end of the container */}

      <hr className="my-4"></hr>
      <div className="row row-cols-1 row-cols-md-3 container">
        {newProducts.map((product, i) => (
          <div className="col mb-4" key={i}>
            <div className="card h-100">
              <img src={`/api/products/photo/${product._id}`} class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">$ {product.price}</p>
                <Link to={`/product/${product._id}`} className="mr-2">
                  <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propType = {
  getProducts: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  newProducts: state.products.newProducts,
});

export default connect(mapStateToProps, { getProducts, getNewProducts })(Home);
