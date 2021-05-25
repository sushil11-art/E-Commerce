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
const [key, setKey] = useState('home');
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
            WELCOME ADMIN
        </Alert.Heading>
        <Row >
          <Col sm={9}>
              <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}>
      <Tab eventKey="home" title="Category">
        <Category categories={categories} loading={loading}/>
      </Tab>
      <Tab eventKey="profile" title="Profile">
      <AdminProducts />
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