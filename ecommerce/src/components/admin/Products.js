import React from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";

const AdminProducts=()=>{
    return (
          <Container>
      {/* <AddCategoryModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        // category={category}
        id={id}
      /> */}
      {/* <EditCategoryModal  show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}/> */}
      <Alert.Heading style={{ width: "20%"}}>
        <Button variant="danger"><i class="fas fa-plus-circle">&nbsp;&nbsp;Add Product</i></Button>
      </Alert.Heading>
      <Table striped bordered hover variant="warning">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {/* {renderCategories} */}
        </tbody>
      </Table>
    </Container>
    )
}

export default AdminProducts;