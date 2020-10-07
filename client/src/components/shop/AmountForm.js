import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../../actions/auth";

const AmountForm = ({ title, addToCart, product }) => {
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => setAmount(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(product, amount);
    window.scrollTo(0, 0);
  };

  const options = () => {
    var arr = [];

    for (let i = 1; i <= product.quantity; i++) {
      arr.push(<option key={i}>{i}</option>);
    }

    return arr;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select className="form-control col-6 mb-2" onChange={handleChange} value={amount}>
          {options()}
        </select>
        <button className="btn btn-outline-primary" type="submit">
          {title}
        </button>
      </form>
    </div>
  );
};

AmountForm.propType = {
  getSingleProduct: PropTypes.func.isRequired,
  getRelatedProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  featuredProduct: state.products.featuredProduct,
});

export default connect(mapStateToProps, { addToCart })(AmountForm);
