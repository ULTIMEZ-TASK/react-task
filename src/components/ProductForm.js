import React, { useState } from "react";
import "./products.css";

const ProductForm = (props) => {
  const [userInput, setUserInput] = useState({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const submitProductDetails = (e) => {
    e.preventDefault();
    props.setdata(userInput);
    setUserInput({
      product_name: "",
      original_price: "",
      sale_price: "",
      product_type: "",
      description: "",
    });
  };

  return (
    <div className="ProductFormCard__Container">
      <h2 className="pt-5">Create New Product</h2>
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="card-body">
            <form onSubmit={submitProductDetails}>
              
                <div class="form-group">
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    placeholder="Product name"
                    name="product_name"
                    value={userInput.product_name}
                    onChange={handleInput}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    required={true}
                    className="form-control"
                    placeholder="Original Price"
                    name="original_price"
                    value={userInput.original_price}
                    onChange={handleInput}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    required={true}
                    className="form-control"
                    placeholder="Sale Price"
                    name="sale_price"
                    value={userInput.sale_price}
                    onChange={handleInput}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    required={true}
                    className="form-control"
                    placeholder="Product Type"
                    name="product_type"
                    value={userInput.product_type}
                    onChange={handleInput}
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    required={true}
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={userInput.description}
                    onChange={handleInput}
                    rows="4"
                  />
                </div>
                <div class="form-group">
                  <input type="submit" className="btn-primary" value="Create" />
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
