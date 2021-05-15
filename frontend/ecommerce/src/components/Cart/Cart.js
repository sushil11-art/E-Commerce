import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AddToCart, FetchCartItems, RemoveFromCart } from "../../actions/cart";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import CheckoutForm from "../checkout/CheckOutForm";

// import "./cart.css";

const Cart = (props) => {
  // console.log(props.children);
  const token = useSelector((state) => state.auth.token);
  const browserHistory = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(FetchCartItems());
  }, [token, browserHistory, FetchCartItems, dispatch]);


  const { products, subTotal, loading } = useSelector((state) => state.cart);
  // console.log(products);

  // pagination..............
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 3;
  const pageVisted = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // pagination renderProducts
  // Add product to your cart
  const AddProduct=async(productID) =>{
    // console.log(productID);
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(AddToCart(productID, props.history));
    // window.location.reload();
  }
  const RemoveProduct=async(productID) =>{
    // console.log(productID);
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(RemoveFromCart(productID, props.history));
  }

  // open checkout form Modal....

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openCheckoutForm=()=>{

  }

  if (products.length > 0 && !loading) {
    const renderProducts = products
      .slice(pageVisted, pageVisted + productsPerPage)
      .map((product) => {
        // console.log(product._id.price);
        const perProductTotal = product._id.price * product.quantity;
        var str = product._id.photo;
        var url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
        // console.log(url);
        var source = "http://localhost:4000/uploads/" + url;
        return (
          <Fragment key={product._id._id}>
            <div className="row border-top border-bottom">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img className="img-fluid" src={source} />
                </div>
                <div className="col">
                  <div className="row text-muted">
                    {product._id.categoryID.name}
                  </div>
                  <div className="row">{product._id.title}</div>
                </div>
                <div className="col">
                  {" "}
                  <Fragment>
                  <button onClick={() => RemoveProduct(product._id._id)}>-</button>{" "}&nbsp;&nbsp;
                  <a href="#" className="border">
                    {product.quantity}
                  </a>&nbsp;&nbsp;
                  <button onClick={() => AddProduct(product._id._id)}>+</button>{" "}
                  </Fragment>
                </div>
                <div className="col">
                  NRS.&nbsp;{product._id.price}
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
      <Fragment>
        <CheckoutForm show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
        <br />
        <div className="card">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">
                    {products.length} items
                  </div>
                </div>
              </div>
              {renderProducts}
              <br />
              <div
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
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
              </div>

              <div className="back-to-shop">
                <Link to="/products">
                  <i className="fas fa-arrow-left"></i>
                </Link>
                <span className="text-muted"><Link to="/products">Back to shop</Link></span>
              </div>
            </div>
            <div className="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div className="row">
                <div className="col" style={{ paddingLeft: "0" }}>
                  ITEMS {products.length}
                </div>
                <div className="col text-right">NRS.{subTotal}</div>
              </div>
              <br />
              <div className="row">
                <div className="col" style={{ paddingLeft: "0" }}>
                  SHIPPING COST
                </div>
                <div className="col text-right">NRS.0</div>
              </div>
              <br />
              <div className="row">
                <div className="col" style={{ paddingLeft: "0" }}>
                  TAX
                </div>
                <div className="col text-right">NRS.0</div>
              </div>
              <div className="row price">
                <div className="col">TOTAL PRICE</div>
                <div className="col text-right">NRS.{subTotal}</div>
              </div>{" "}
              <button onClick={handleShow} className="btn">CHECKOUT</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <br />
        <div className="container-fluid mt-100">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5>Cart</h5>
                </div>
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    {" "}
                    <img
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      src="https://i.imgur.com/dCdflKN.png"
                      width="130"
                      height="130"
                      className="img-fluid mb-4 mr-3"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy :)</h4>{" "}
                    <Link
                      to="/products"
                      className="btn btn-primary cart-btn-transform m-3"
                      data-abc="true"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default withRouter(Cart);
