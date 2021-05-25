import React, { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";

import {useDispatch, useSelector} from "react-redux"
import { AddCategory,getCategory,editCategory} from "../../actions/adminAction";

const AddCategoryModal=({ show, setShow, handleClose, handleShow,id})=>{
  // console.log(id);
    const {category}=useSelector(state=>state.adminCategory)
    const [formData,setFormData]=useState({
      name:""
    })
    const dispatch=useDispatch();
    const addCategory=async()=>{
       dispatch(AddCategory(formData));
       handleClose()
    }
     const EditCategory=async(id)=>{
       dispatch(editCategory(formData,id));
       handleClose()
    }
    useEffect(()=>{
      if(id){
        dispatch(getCategory(id))
      }
    // setFormData({name:category.name})
    },[id])
    useEffect(()=>{
      setFormData({name:category.name})
    },[category])


    const {name}=formData;
    const onChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value})    
    // setFormData({name:category.name});
    return(
        <Modal
        size="md"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             {/* <div className="grid md:grid-cols-3 md:gap-2"> */}
                <input
                  type="text"
                  name="name"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              {/* </div>{" "} */}
              
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
                    onClick={!id ? addCategory : (()=>EditCategory(id))}
                  //   className="btn btn-danger"
                  className="h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white"
                >
                  Save
                  {/* Continue to Shipping */}
                </button>{" "}
              </div>
        </Modal.Body>
        </Modal>
    )
} 

export default AddCategoryModal;