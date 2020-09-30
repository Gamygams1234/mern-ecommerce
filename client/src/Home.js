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
    <div>
      <div className="jumbotron home-product jumbotron-fluid bg-dark text-white ">
        <div className="container text-md-left pt-5">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">Thanks for coming to my store to check out some of the products.</p>
          <hr className="my-4"></hr>
          <p>Let's shop for some new sparring gear.</p>
          <Link className="btn btn-info btn-lg" to="/shop" role="button">
            Shop
          </Link>
        </div>
      </div>
      <div className="container">
        <hr className="my-4"></hr>
        <h4>Best Sellers</h4>
        <div className="row row-cols-1 row-cols-md-3 container">
          {products.map((product, i) => (
            <div className="col mb-4" key={i}>
              <div className="card h-100">
                <img src={`/api/products/photo/${product._id}`} className="card-img-top" alt="..." />
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
        {/*the end of the container */}

        <hr className="my-4"></hr>
        <h4>New Products</h4>
        {newProducts ? (
          <div className="row row-cols-1 row-cols-md-3 container">
            {newProducts.map((product, i) => (
              <div className="col mb-4" key={i}>
                <div className="card h-100">
                  <img src={`/api/products/photo/${product._id}`} className="card-img-top" alt="..." />
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
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      {/*Ending the container*/}
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
