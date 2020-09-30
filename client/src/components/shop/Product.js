import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../../actions/products";

const Product = ({ getSingleProduct, featuredProduct }) => {
  let { product_id } = useParams();

  useEffect(() => {
    getSingleProduct(product_id);
  }, []);

  return featuredProduct ? (
    <div className="container">
      <h1>{featuredProduct.name}</h1>
      <div className="row row-cols-1 row-cols-md-3 container">
        <div className="col mb-4">
          <div className="card h-100">
            <img src={`/api/products/photo/${product_id}`} class="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{featuredProduct.name}</h5>
              <p className="card-text">{featuredProduct.description}</p>
              <p className="card-text">$ {featuredProduct.price}</p>
              <Link to={`/product/${product_id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>loading</h1>
    </div>
  );
};

Product.propType = {
  getSingleProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  featuredProduct: state.products.featuredProduct,
});

export default connect(mapStateToProps, { getSingleProduct })(Product);
