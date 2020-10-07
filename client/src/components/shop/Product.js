import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getSingleProduct, getRelatedProducts } from "../../actions/products";
import { addToCart, resetMessages } from "../../actions/auth";
import AmountForm from "./AmountForm";
import { set } from "mongoose";

const Product = ({ getSingleProduct, featuredProduct, getRelatedProducts, relatedProducts, message, resetMessages }) => {
  let { product_id } = useParams();

  const [productId, setProductId] = useState(product_id);

  const showSuccess = () => (
    <div className="alert alert-success mt-4" style={{ display: message ? "" : "none" }}>
      {message}
    </div>
  );

  const componentMount = () => {
    getSingleProduct(product_id);
    getRelatedProducts(product_id);
    resetMessages();
  };

  useEffect(() => {
    getSingleProduct(productId);
    getRelatedProducts(productId);
    resetMessages();
  }, [productId]);

  return (
    <div className="container">
      {showSuccess()}
      <div className="row container mt-4">
        <div className="col-md col-xl-7 mb-4">
          <h1>{featuredProduct.name}</h1>
          <div className="card">
            <img src={`/api/products/photo/${productId}`} class="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{featuredProduct.name}</h5>
              <p className="card-text">{featuredProduct.description}</p>
              <p className="card-text">$ {featuredProduct.price}</p>
              <p className="card-text">Stock Left: {featuredProduct.quantity}</p>
              <AmountForm title="Add To Cart" product={featuredProduct}></AmountForm>
            </div>
          </div>
        </div>
        <div className="col-md col-xl-3 ml-auto text-center">
          <h2>Related Products</h2>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct, i) => (
              <div className="card mb-3" key={i}>
                <img src={`/api/products/photo/${relatedProduct._id}`} class="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.name}</h5>
                  <p className="card-text">$ {relatedProduct.price}</p>
                  <Link
                    onClick={() => {
                      setProductId(relatedProduct._id);
                    }}
                    to={`/product/${relatedProduct._id}`}
                    className="mr-2"
                  >
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <div>There are no products related at this time.</div>
              <div>Please check later.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Product.propType = {
  getSingleProduct: PropTypes.func.isRequired,
  getRelatedProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  featuredProduct: state.products.featuredProduct,
  relatedProducts: state.products.relatedProducts,
  message: state.auth.message,
});

export default connect(mapStateToProps, { getSingleProduct, getRelatedProducts, addToCart, resetMessages })(Product);
