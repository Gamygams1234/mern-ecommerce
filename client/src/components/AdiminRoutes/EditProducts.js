import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getFilteredProducts, getSearchProducts, deleteProduct } from "../../actions/products";
import { addToCart, resetMessages } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

const EditProducts = ({ products, getProducts, getFilteredProducts, getSearchProducts, resetMessages, deleteProduct, userID, token }) => {
  // setting state
  const [categories, setCategories] = useState([]);
  const [displayHeader, setDisplayHeader] = useState("");
  const [search, setSearch] = useState("");
  const [madeSearch, setMadeSearch] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productSearch = { name: { $regex: search, $options: "i" } };
    getSearchProducts(productSearch);
    setSearch("");
    setMadeSearch(true);
  };

  useEffect(() => {
    getProducts("createdAt");
    fetchCategories();
    setDisplayHeader("New Arrivals");
    resetMessages();
  }, []);

  // getting our existing category for select toggle
  const fetchCategories = () => {
    axios
      .get(`/api/category/all`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // when we click the category, filtering the category
  function getCategorySearch(arg) {
    const category = { category: arg };
    getFilteredProducts(0, 100, category);
    setMadeSearch(false);
  }

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: message ? "" : "none" }}>
      {message}
    </div>
  );

  return (
    <div>
      <div className="jumbotron shop-product jumbotron-fluid bg-dark text-white ">
        <div className="container text-md-left pt-5">
          <h1 className="display-4">Shop for products</h1>
          <p className="lead">We have tons of gear for all your sparring and fitness needs</p>
          <hr className="my-4"></hr>
          <p>Let's shop for some new sparring gear.</p>
          <Link className="btn btn-info btn-lg" to="/shop" role="button">
            Shop
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        {showSuccess()}
        <div className="row flex-xl-nowrap">
          <div className="col-md-3 col-xl-2 bd-sidebar mb-4">
            <form onSubmit={handleSubmit} role="search" className="bd-search d-flex align-items-center mb-4">
              <input type="search" className="form-control" id="search-input" placeholder="Search..." aria-label="Search for..." onChange={handleChange} />
              <button className="btn bd-search-docs-toggle d-md-none p-0 ml-3" type="button" data-toggle="collapse" data-target="#bd-docs-nav" aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false">
                  <title>Menu</title>
                  <path stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22" />
                </svg>
              </button>
            </form>

            <nav className="collapse bd-links navbar-light" id="bd-docs-nav" aria-label="Main navigation">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link "
                    onClick={() => {
                      getProducts("createdAt");
                      setDisplayHeader("New Arrivals");
                    }}
                  >
                    New Arrivals
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      getProducts("sold");
                      setDisplayHeader("Best Sellers");
                    }}
                  >
                    Best Sellers
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {categories.length > 0 ? (
                      <div>
                        {categories.map((item, i) => (
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              getCategorySearch(item._id);
                              setDisplayHeader(`You are now seeing ${item.name}`);
                            }}
                            key={i}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p>There are no categories to browse.</p>
                    )}

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
            <h2 className="mb-4">{displayHeader}</h2>
            {products.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-3 container">
                {products.map((product, i) => (
                  <div className="col mb-4" key={i}>
                    <div className="card h-100">
                      <img src={`/api/products/photo/${product._id}`} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">$ {product.price}</p>
                        <p className="card-text">Stock Left: {product.quantity}</p>

                        <Link to={`/admin/product/update/${product._id}`} className="mr-2">
                          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">Edit Product</button>
                        </Link>
                        <button
                          onClick={() => {
                            deleteProduct(product._id, userID, token);
                            setMessage(`The product ${product.name} has been deleted.`);
                            window.scrollTo(0, 0);
                          }}
                          className="btn btn-outline-danger mt-2 mb-2 card-btn-1"
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : madeSearch ? (
              <h4>Sorry, there are no products matching thet search.</h4>
            ) : (
              <h4>There are no products to display at this time.</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EditProducts.propType = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  getFilteredProducts: PropTypes.func.isRequired,
  getSearchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  token: state.auth.token,
  userID: state.auth.user._id,
});

export default connect(mapStateToProps, { getProducts, getFilteredProducts, getSearchProducts, addToCart, resetMessages, deleteProduct })(EditProducts);
