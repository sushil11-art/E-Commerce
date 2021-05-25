import React,{useState,useEffect} from "react";
import { Fragment } from "react";
import {Alert,Row,Col, Container,Tabs,Tab} from "react-bootstrap"
import { Link ,Route} from "react-router-dom";
import Category from "./Category";
import AdminProducts from "./Products";
// import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import { adminCategories } from "../../actions/adminAction";

const Dashboard=()=>{
const [key, setKey] = useState('products');
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(adminCategories())
  },[dispatch])

  const {categories,loading}=useSelector(state=>state.adminCategory)
  // console.log(categories);  
    return (
<Container>
    <br />
  <Row>
    <Alert variant="danger">
         <Alert.Heading style={{textAlign:"center"}}>
           <i class="fas fa-door-open"></i> WELCOME ADMIN <i class="fas fa-1x fa-user-shield"></i>
        </Alert.Heading>
        <Row >
          <Col sm={12}>
              <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}>
        <Tab eventKey="products" title="Products">
      <AdminProducts />
      </Tab>
      <Tab eventKey="category" title="Category">
        <Category categories={categories} loading={loading}/>
      </Tab>
      
      <Tab eventKey="contact" title="Contact">
        Contact Me
      </Tab>
    </Tabs>
      </Col>
      <Col sm={3}>
     
      </Col>
        </Row> 
    </Alert>       
  </Row>
</Container>


    )
}
export default Dashboard;