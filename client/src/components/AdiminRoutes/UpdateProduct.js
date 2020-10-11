import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { updateProduct } from "../../actions/products";

const UpdateProduct = ({ userID, token, updateProduct }) => {
  let { product_id } = useParams();
  const [values, setValues] = useState({
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
  });
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const [object, setObject] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
  });

  const { loading, error, createdProduct, redirectToProfile, formData } = values;
  const { name, description, price, category, shipping, quantity } = object;

  const getSingleProduct = (productId) => {
    axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setObject({
          ...object,
          name: res.name ? res.name : "",
          description: res.description ? res.description : "",
          price: res.price ? res.price : "",
          category: res.category._id ? res.category._id : "",
          shipping: res.shipping ? res.shipping : "",
          quantity: res.quantity ? res.quantity : "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getSingleProduct(product_id);
    fetchCategories();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    setObject({ ...object, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: "",
    });

    var form_data = new FormData();

    for (var key in object) {
      form_data.append(key, object[key]);
    }

    axios({
      method: "put",
      url: `/api/products/update/${product_id}/${userID}`,
      data: form_data,
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setSuccess(name);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err.message);
        setValues({
          ...values,
          error: "There was an error with placing the product",
        });
        window.scrollTo(0, 0);
      });
  };

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      The new category, {success}, has been updated.
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="">
        <h1 className="display-4">Updating Products</h1>
        <p className="lead">Let's update the product in the form below</p>
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
            {categories.map((c, i) => (
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

        <button className="btn btn-outline-primary">Update Product</button>
      </form>
    </div>
  );
};

UpdateProduct.propType = {
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userID: state.auth.user._id,
  token: state.auth.token,
  featuredProduct: state.products.featuredProduct,
});

export default connect(mapStateToProps, { updateProduct })(UpdateProduct);
