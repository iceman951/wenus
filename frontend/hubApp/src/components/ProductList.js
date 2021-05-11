import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("https://salty-meadow-43376.herokuapp.com/products/all")
      .then((res) => {
        if (res.status === 200) {
          setProductList(res.data["data"]);
        }
      });
  }, []);
  const removeProductById = (product, e) => {
    const url = `https://salty-meadow-43376.herokuapp.com/products/deleteByID`;
    const data = {
      data: {
        oid: product._id,
      },
    };
    axios
      .delete(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [modal, setModal] = useState(false);
  const rows = [];
  let cards = [];
  let key = "";
  for (const [index, product] of productList.entries()) {
    key = key + product._id;
    cards.push(
      <div className="col-4 mr-auto" key={product._id}>
        <div className="card" style={{ marginTop: "20px" }}>
          <div className="card-header">
            <span className="float-start">{product.type}</span>
            <span className="float-end">{product.product_code}</span>
          </div>
          <img src='/img_snow.jpg' className="card-img-top" alt="productImage" />
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">Brand: {product.brand}</p>
            <button
              className="btn btn-primary float-end"
              onClick={(e) => removeProductById(product, e)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
    if (index % 3 === 2) {
      rows.push(
        <div className="row" key={key}>
          {cards}
        </div>
      );
      cards = [];
      key = "";
    }
    if (index === productList.length - 1) {
      cards.push(
        <div className="col-4 mr-auto">
          <img
            src='/plus.png'
            onClick={() => handleOpenModal()}
            className="img-thumbnail click-image"
            alt="addProduct"
          />
        </div>
      );
      rows.push(
        <div className="row" key={key}>
          {cards}
        </div>
      );
    }
  }

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <div>
      <div className="container p-3 my-3 border">{rows}</div>;
      <Modal isOpen={modal}>
        <button onClick={handleCloseModal} className="float-end">
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

export default ProductList;
