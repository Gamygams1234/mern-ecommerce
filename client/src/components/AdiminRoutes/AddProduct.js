import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddProduct = ({ user, token }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const [success, setSuccess] = useState(false);

  const { name, description, price, categories, category, shipping, quantity, loading, error, createdProduct, redirectToProfile, formData } = values;

  // getting the categories to load on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`/api/category/all`)
      .then((res) => {
        setValues({
          ...values,
          categories: res.data,
          formData: new FormData(),
        });
      })
      .catch((err) => {
        setValues({ ...values, error: err });
      });
  };

  // setError("");
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: "",
    });
    if (name === "") {
      setValues({
        ...values,
        error: "Please place a name for the product.",
      });
      window.scrollTo(0, 0);
    } else if (description === "") {
      setValues({
        ...values,
        error: "Please place a description for the product.",
      });
      window.scrollTo(0, 0);
    } else if (price === "") {
      setValues({
        ...values,
        error: "Please place a price for the product.",
      });
      window.scrollTo(0, 0);
    } else if (category === "") {
      setValues({
        ...values,
        error: "Please make sure that the product has a category.",
      });
      window.scrollTo(0, 0);
    } else if (shipping === "") {
      setValues({
        ...values,
        error: "Please make make sure that the product has a category.",
      });
      window.scrollTo(0, 0);
    } else if (quantity === "") {
      setValues({
        ...values,
        error: "Please make make sure that the product has a quantity.",
      });
      window.scrollTo(0, 0);
    } else {
      axios({
        method: "post",
        url: `/api/products/create/${user._id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setSuccess(name);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          setValues({
            ...values,
            error: "There was an error with placing the product",
          });
          window.scrollTo(0, 0);
        });
    }
  };

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      The new category, {success}, has been added.
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="">
        <h1 className="display-4">Adding Products</h1>
        <p className="lead">Add a new product in the form below</p>
      </div>
      <hr className="my-4"></hr>
      {showSuccess()}
      {showError()}

      <form className="mb-3" onSubmit={submit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*" />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea onChange={handleChange("description")} className="form-control" value={description} />
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input onChange={handleChange("price")} type="number" className="form-control" value={price} />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Please select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input onChange={handleChange("quantity")} type="number" className="form-control" value={quantity} />
        </div>

        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(AddProduct);
