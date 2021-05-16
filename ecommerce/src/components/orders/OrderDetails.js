import React, { Fragment, useEffect } from "react";
import {
  Row,
  Container,
  Alert,
  Col,
  ListGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { orderDetails, cancelOrder, placeOrderByID, placeOrder } from "../../actions/order";

const OrderDetails = (props) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  const orderID = props.match.params.orderID;

  useEffect(() => {
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(orderDetails(orderID));
    // dispatch(getMyOrders())
  }, [token, browserHistory, dispatch, orderID]);
  const { order, loading } = useSelector((state) => state.order);
 const CancelOrder = async (orderID) => {
    // console.log(productID);
    dispatch(cancelOrder(orderID, props.history));
  };
  const PlaceOrder = async (orderID) => {
    // console.log(productID);
    dispatch(placeOrderByID(orderID, props.history));
  };


  if (Object.keys(order).length !== 0 && !loading) {
    const { products } = order;
    const renderItems = products.map((product) => {
      const perProductTotal = product.product.price * product.quantity;
      var str = product.product.photo;
      var url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
      // console.log(url);
      var source = "http://localhost:4000/uploads/" + url;

      return (
        <Fragment>
          <div className="row border-top border-bottom">
            <div className="row main align-items-center">
              <div className="col-2">
                <img className="img-fluid" src={source} />
              </div>
              <div className="col">
                <div className="row text-muted">
                  {product.product.categoryID.name}
                </div>
                <div className="row">{product.product.title}</div>
              </div>
              <div className="col">
                {" "}
                <Fragment>
                  <a href="#" className="border">
                    {product.quantity}
                  </a>
                  &nbsp;&nbsp;
                </Fragment>
              </div>
              <div className="col">
                NRS.&nbsp;{product.product.price}
                <span className="close"></span>
              </div>
              <div className="col">
                Total.&nbsp;{perProductTotal}
                <span className="close"></span>
              </div>
            </div>
          </div>
        </Fragment>
      );
    });
    return (
      <Container>
        <br />
        <Row>
          <Col sm={8}>
            <Alert variant="dark">
              <Alert.Heading>ORDER ID {order._id} </Alert.Heading>
              <hr />
              <Alert.Heading>SHIPPING</Alert.Heading>
              <p>
                <ListGroup>
                  <ListGroup.Item variant="warning">
                    Name&nbsp;:-{order.address.fullName}
                  </ListGroup.Item>
                  <ListGroup.Item variant="secondary">
                    Phone number&nbsp;:-{order.address.phoneNumber}
                  </ListGroup.Item>
                  <ListGroup.Item variant="warning">
                    Country&nbsp;:-{order.address.country}
                  </ListGroup.Item>
                  {order.address.streetAddress !== "" ? (
                    <ListGroup.Item variant="secondary">
                      Street Address&nbsp;:-{order.address.streetAddress}
                    </ListGroup.Item>
                  ) : null}
                  {order.address.city !== "" ? (
                    <ListGroup.Item variant="warning">
                      City&nbsp;:-{order.address.city}
                    </ListGroup.Item>
                  ) : null}
                  {order.address.state !== "" ? (
                    <ListGroup.Item variant="secondary">
                      State&nbsp;:-{order.address.state}
                    </ListGroup.Item>
                  ) : null}
                  {order.address.zipCode !== "" ? (
                    <ListGroup.Item variant="warning">
                      Zip Code&nbsp;:-{order.address.zipCode}
                    </ListGroup.Item>
                  ) : null}
                </ListGroup>
              </p>
              <br />
              {order.deliveryStatus == "Delivered" ? (
                <Alert variant="success">
                  DELIVERY STATUS:&nbsp;{order.deliveryStatus}
                </Alert>
              ) : (
                <Alert variant="danger">
                  DELIVERY STATUS: &nbsp;{order.deliveryStatus}
                </Alert>
              )}
              <hr />
              <Alert.Heading>PAYMENT METHOD</Alert.Heading>
              <p className="mb-0">
                <ListGroup>
                  <ListGroup.Item variant="light">
                    {order.paymentMethod}
                  </ListGroup.Item>
                </ListGroup>
              </p>
              <br />
              {order.paidStatus == false ? (
                <Alert variant="danger">PAID STATUS:&nbsp;UNPAID</Alert>
              ) : (
                <Alert variant="success">PAID STATUS: &nbsp;PAID</Alert>
              )}{" "}
              <hr />
              <Alert.Heading>ORDER ITEMS</Alert.Heading>
              {order.orderStatus == "Placed" ? (
                <Alert variant="success">
                  ORDER STATUS:&nbsp;{order.orderStatus}
                </Alert>
              ) : (
                <Alert variant="danger">
                  ORDER STATUS: &nbsp;{order.orderStatus}
                </Alert>
              )}
              {/* render items */}
              {renderItems}
            </Alert>
          </Col>
          <Col sm={4}>
            {" "}
            <Alert variant="success">
              <Alert.Heading>ORDER SUMMARY</Alert.Heading>
              <ListGroup>
                <ListGroup.Item
                  variant="warning"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>Items</h1>
                  <p>{order.products.length}</p>
                </ListGroup.Item>
                <ListGroup.Item
                  variant="secondary"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>Shipping Cost</h1>
                  <p>NRs.{order.shippingCost}</p>
                </ListGroup.Item>
                <ListGroup.Item
                  variant="warning"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>Tax</h1>
                  <p>NRs.{order.tax}</p>
                </ListGroup.Item>
                <hr />
                <ListGroup.Item
                  variant="secondary"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>Sub Total</h1>
                  <p>NRs.{order.totalPrice}</p>
                </ListGroup.Item>
              </ListGroup>
              <hr />
              {order.orderStatus == "Cancelled" ? (
                <Button
                  variant="btn btn-danger"
                  onClick={() => PlaceOrder(order._id)}
                >
                  Place Order
                </Button>
              ) :  (
                <Button
                  variant="btn btn-success"
                  onClick={() => CancelOrder(order._id)}
                >
                  Cancel Order
                </Button>
              )}

              {/* <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p> */}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <br />
        <Spinner animation="border" variant="primary" />
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="border" variant="success" />
        <Spinner animation="border" variant="danger" />
        <Spinner animation="border" variant="warning" />
        <Spinner animation="border" variant="info" />
        <Spinner animation="border" variant="light" />
        <Spinner animation="border" variant="dark" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Go to orders
        </Button>
      </Container>
    );
  }
};

export default withRouter(OrderDetails);
