import React,{useState,useEffect} from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
import { deletCategory ,getCategory} from "../../actions/adminAction";
import AddCategoryModal from "./AddCategory";
// import EditCategoryModal from "./EditCategory";
import {useDispatch, useSelector} from "react-redux";
// import { adminCategories } from "../../actions/adminAction";


const Category = ({categories,loading}) => {
  // console.log(categories);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch=useDispatch();
  const [id,setId]=useState("");
  const handleShow = () => {
    setId(null)
    setShow(true)
  };
  const editMode=(id)=>{
    handleShow();
    setId(id);
    // dispatch(getCategory(id));
  }
    // console.log(id)
  // const editMode=(id)=>{
  //   handleShow();
  //   dispatch(getCategory(id));
  // }
  const CategoryDelete=(id)=>{
        dispatch(deletCategory(id))
  }

  
  const {category}=useSelector(state=>state.adminCategory)

  const renderCategories=categories.map(category=>{
    return (
         <tr key={category._id}>
            <td>{category.name}</td>
            <td>
          <i class="fas fa-edit" style={{color:"blue"}} onClick={()=>editMode(category._id)}></i>
        &nbsp;&nbsp;&nbsp;&nbsp;

            <i class="fas fa-trash" style={{color:"red"}} onClick={()=>CategoryDelete(category._id)}></i>
            </td>
          </tr>
    )
  })

  return (
    <Container>
      <AddCategoryModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        // category={category}
        id={id}
      />
      {/* <EditCategoryModal  show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}/> */}
      <Alert.Heading style={{ width: "20%"}}>
        <Button variant="danger"  onClick={handleShow} >Add Category</Button>
      </Alert.Heading>
      <Table striped bordered hover variant="warning">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {renderCategories}
        </tbody>
      </Table>
    </Container>
  );
};

export default Category;
