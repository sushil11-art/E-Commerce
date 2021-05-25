import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminProducts } from "../../actions/adminAction";
import AddProductModal from "./AddProduct";
const AdminProducts = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // setId(null)
    setShow(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.adminProduct);
  const renderProducts = products.map((product) => {
    var str = product.photo;
    var url = str.replace("uploads/", "");
    // var url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
    // console.log(url);
    var source = "http://localhost:4000/uploads/" + url;
    return (
      <tr key={product._id}>
        <td>{product._id}</td>
        {!product.categoryID.name ? (
          <td></td>
        ) : (
          <td>{product.categoryID.name}</td>
        )}
        <td>{product.title}</td>
        <td>
          <img
            alt="ecommerce"
            src={product.photo}
            className="object-cover object-center"
          />
        </td>
        <td>Rs.{product.price}</td>
        <td>
          <i class="fas fa-edit" style={{ color: "blue" }}></i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fas fa-trash" style={{ color: "red" }}></i>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <AddProductModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      // category={category}
      // id={id}
      />
      <Alert.Heading style={{ width: "20%" }}>
        <Button variant="danger" onClick={handleShow}>
          <i class="fas fa-plus-circle" >&nbsp;&nbsp;Add Product</i>
        </Button>
      </Alert.Heading>
      <Table striped bordered hover variant="warning">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Category Name</th>
            <th>Product Name</th>
            <th>Product Photo</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderProducts}</tbody>
      </Table>
    </Container>
  );
};

export default AdminProducts;
