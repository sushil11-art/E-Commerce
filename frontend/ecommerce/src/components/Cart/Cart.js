import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AddToCart, FetchCartItems, RemoveFromCart } from "../../actions/cart";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
// import "./cart.css";

const Cart = (props) => {
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
  const AddProduct=(productID) =>{
    // console.log(productID);
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(AddToCart(productID, props.history));
  }
  const RemoveProduct=(productID) =>{
    // console.log(productID);
    if (!token) {
      browserHistory.push("/login");
    }
    dispatch(RemoveFromCart(productID, props.history));
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
            <div class="row border-top border-bottom">
              <div class="row main align-items-center">
                <div class="col-2">
                  <img class="img-fluid" src={source} />
                </div>
                <div class="col">
                  <div class="row text-muted">
                    {product._id.categoryID.name}
                  </div>
                  <div class="row">{product._id.title}</div>
                </div>
                <div class="col">
                  {" "}
                  <Fragment>
                  <button onClick={() => RemoveProduct(product._id._id)}>-</button>{" "}&nbsp;&nbsp;
                  <a href="#" class="border">
                    {product.quantity}
                  </a>&nbsp;&nbsp;
                  <button onClick={() => AddProduct(product._id._id)}>+</button>{" "}
                  </Fragment>
                </div>
                <div class="col">
                  NRS.&nbsp;{product._id.price}
                  <span class="close"></span>
                </div>
                <div class="col">
                  Total.&nbsp;{perProductTotal}
                  <span class="close"></span>
                </div>
              </div>
            </div>
          </Fragment>
        );
      });

    return (
      <Fragment>
        <br />
        <div class="card">
          <div class="row">
            <div class="col-md-8 cart">
              <div class="title">
                <div class="row">
                  <div class="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div class="col align-self-center text-right text-muted">
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

              <div class="back-to-shop">
                <a href="#">
                  <i class="fas fa-arrow-left"></i>
                </a>
                <span class="text-muted">Back to shop</span>
              </div>
            </div>
            <div class="col-md-4 summary">
              <div>
                <h5>
                  <b>Summary</b>
                </h5>
              </div>
              <hr />
              <div class="row">
                <div class="col" style={{ paddingLeft: "0" }}>
                  ITEMS {products.length}
                </div>
                <div class="col text-right">NRS.{subTotal}</div>
              </div>
              <br />
              <div class="row">
                <div class="col" style={{ paddingLeft: "0" }}>
                  SHIPPING COST
                </div>
                <div class="col text-right">NRS.0</div>
              </div>
              <br />
              <div class="row">
                <div class="col" style={{ paddingLeft: "0" }}>
                  TAX
                </div>
                <div class="col text-right">NRS.0</div>
              </div>
              <div class="row price">
                <div class="col">TOTAL PRICE</div>
                <div class="col text-right">NRS.{subTotal}</div>
              </div>{" "}
              <button class="btn">CHECKOUT</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <br />
        <div class="container-fluid mt-100">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h5>Cart</h5>
                </div>
                <div class="card-body cart">
                  <div class="col-sm-12 empty-cart-cls text-center">
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
                      class="img-fluid mb-4 mr-3"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy :)</h4>{" "}
                    <Link
                      to="/products"
                      class="btn btn-primary cart-btn-transform m-3"
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
