import React, { useEffect,useState, Fragment } from "react";
import { Table, Container, Alert, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../actions/order";
import ReactPaginate from "react-paginate";
import { useHistory, Link } from "react-router-dom";

const Order = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  useEffect(() => {
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(getMyOrders());
  }, [dispatch,token, browserHistory]);
  const { orders, loading } = useSelector((state) => state.order);

  // pagination to orders

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pageVisted = pageNumber * productsPerPage;

  const pageCount = Math.ceil(orders.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  if (orders.length > 0 && !loading) {
    const renderOrders = orders.slice(pageVisted, pageVisted + productsPerPage).map((order) => {
      return (
        <Fragment>
          <tr>
            <td>{order._id}</td>
            <td>{order.deliveryStatus}</td>
            <td>
              {order.paidStatus === false ? (
                <button class="btn btn-danger">
                  <i class="fas fa-money-bill-wave"></i>&nbsp;Unpaid
                </button>
              ) : (
                <button
                  class="btn btn-success"
                  style={{ backgroundColor: "#00ff5f", fontStyle: "bold" }}
                >
                  <i class="fas fa-money-bill-wave"></i>&nbsp;Paid
                </button>
              )}
            </td>
            <td>{order.paymentMethod}</td>
            <td>Nrs.{order.totalPrice}</td>
            <td>{order.orderStatus}</td>
            <td>
              <Link to={`/order-details/${order._id}`}>
                <button className="btn btn-primary">
                  <i class="fas fa-eye"></i>&nbsp;Details
                </button>
              </Link>
            </td>
          </tr>
        </Fragment>
      );
    });
    return (
      <Fragment>
        <Container style={{ width: "100%" }} variant="warning">
          <br />
          <Alert.Heading>MY ORDERS</Alert.Heading>

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
            <tbody>{renderOrders}</tbody>s
          </Table>
          <Alert variant="light">
               <ReactPaginate
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttns"}
                  nextLinkClassName={"nextBttns"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  breakLabel={"..."}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                />
            </Alert>

        </Container>
      </Fragment>
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

export default Order;
