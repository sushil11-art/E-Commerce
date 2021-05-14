import React,{useEffect,Fragment} from "react";
import { Table ,Container} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import { getMyOrders } from "../../actions/order";

import {useHistory} from "react-router-dom";

const Order = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch=useDispatch();
    const browserHistory = useHistory();
    useEffect(()=>{
        if(!token){
            browserHistory.push('/login')
        }
        dispatch(getMyOrders())
    },[dispatch,getMyOrders,token,browserHistory])
    const {orders,loading}=useSelector(state=>state.order)
    if(orders.length >0 && !loading){
        const renderOrders =orders.map((order) => {
            console.log(order.paidStatus)
        return(
        <Fragment>
             <tr>
          <td>{order._id}</td>
        <td>{order.deliveryStatus}</td>
          <td>{ order.paidStatus==false ? (
              <button class="btn btn-danger">
                <i class="fas fa-money-bill-wave"></i>&nbsp;Unpaid
              </button>
          ):(<button class="btn btn-success" style={{backgroundColor:'#00ff5f',fontStyle:"bold"}}>
                  <i class="fas fa-money-bill-wave"></i>&nbsp;Paid
              </button>) }</td>
        <td>{order.paymentMethod}</td>
          <td>Nrs.{order.totalPrice}</td>
          <td>{order.orderStatus}</td>
        <td><button className="btn btn-primary"><i class="fas fa-eye" style={{color:'#00d7d7'}}></i>&nbsp;Details</button></td>
        </tr>
        </Fragment>
        );
    }
      );
        return (
    <Container >
        <br />
    <button className="btn btn-danger btn-lg btn-block" style={{height:"50" ,fontSize:"25px",fontStyle:"italic",fontFamily:"sans-serif"}}>
        My Orders
    </button>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
        <th>Delivery Status</th>
        <th>Paid status</th>
        <th>Payment Method</th>
          <th>TOTAL</th>
          <th>Order Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {renderOrders}
      </tbody>s
    </Table>
    </Container>

  );
    }
    else{
        return(
            <div>Loading............</div>
        )
    }
  
};

export default Order;
