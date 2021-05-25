import { Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../actions/adminAction";

const AddProductModal = ({ show, setShow, handleClose, handleShow }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.adminCategory);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    category: "",
    stockQuantity: 0,
    description: "",
    selectedFile: "",
  });
  const onName = (e) => {
    setFormData({ ...formData,title: e.target.value });
  };
  const onPrice = (e) => {
    setFormData({ ...formData,price: e.target.value });
  };
  const onStockQuantity = (e) => {
    setFormData({ ...formData,stockQuantity: e.target.value });
  };
  //   const onFileChange=(e)=>{
  //     setFormData({...selectedFile:e.target.files[0]});
  //     console.log(selectedFile);
  //   }
  const onDescription = (e) => {
    setFormData({ ...formData,description: e.target.value });
  };
  const onFileChange = (e) => {
    setFormData({ ...formData, selectedFile: e.target.files[0] });

    // console.log(selectedFile);
  };
  const onCategoryChange = (e) => {
    setFormData({ ...formData,category: e.target.value });
    //   console.log(e.target.value)
  };

    const { title, price, category, stockQuantity, description, selectedFile } =
    formData;
  const ProductAdd = async() => {
    // console.log(category,selectedFile);
    // console.log(category);
    let data= new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("stockQuantity", stockQuantity);
    data.append("description", description);
    data.append("selectedFile", selectedFile);
    // console.log(selectedFile);
    dispatch(AddProduct(data, category));
    handleClose();
  };


  // console.log(selectedFile, category);
  return (
    <Modal
      size="md"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          name="title"
          className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
          placeholder="Enter product name"
          value={title}
          onChange={onName}
        />
        <input
          type="number"
          name="price"
          className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
          placeholder="Enter price"
          value={price}
          onChange={onPrice}
        />
        <input
          type="number"
          name="stockQuantity"
          className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={onStockQuantity}
        />

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={onDescription}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select" name="category" onChange={onCategoryChange}>
            {categories.map(c=>{
              return (
                    <option value={c._id} key={c._id}>{c.name}</option>
              )
            })}
            
          </Form.Control>
        </Form.Group>

        <input
          type="file"
          name="selectedFile"
          className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
          placeholder="Choose Picture"
          // value={selectedFile}
          onChange={onFileChange}
        />

        <div className="flex justify-between items-center pt-2">
          {" "}
          <button
            type="button"
            onClick={handleClose}
            className="h-12 w-24 text-blue-500 text-xs font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={ProductAdd}
            // onClick={!id ? addCategory : (()=>EditCategory(id))}
            className="btn btn-danger"
            className="h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white"
          >
            Save
          </button>{" "}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
