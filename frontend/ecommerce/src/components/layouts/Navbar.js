import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect, useSelector, useDispatch } from "react-redux";
import { logoutCustomer } from "../../actions/auth";
import { getCategories } from "../../actions/category";

// import Carou from "./Landing";
// import estore from "./estore.jpg"

const Navbar = ({ logoutCustomer }) => {
  const GuestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          <i className="fas fa-2x fa-user"></i>&nbsp;Sign In
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          <i className="fas fa-2x fa-user-plus"></i>&nbsp;Sign Up
        </Link>
      </li>
    </Fragment>
  );

  const AuthLinks = (
    <li className="nav-item">
      <button onClick={logoutCustomer} className="nav-link">
        <i className="fas fa-2x fa-sign-out-alt"></i>&nbsp;Sign Out
      </button>
    </li>
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  // access token from redux store
  const token = useSelector((state) => state.auth.token);
  // redux
  // const getCategories=()=>{
  //   dispatch(getCategories());
  // }
  const { categories, loading } = useSelector((state) => state.category);
  // console.log(categories);

  const showCategories = categories.map((category) => {
    return (
      <li key={category._id} className="list-style active">
        <Link to={`/category/${category._id}`} className="dropdown-item">
          {category.name}
        </Link>
      </li>
    );
  });

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ fontStyle: "italic" }}>
            {/* <img src="" alt="" width="30" height="24" className="d-inline-block align-text-top" /> */}
            <i className="fab fa-2x fa-shopify" style={{ color: "green" }}></i>
            &nbsp;Hamro Pasal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link">
                  <i className="fas fa-2x fa-home" style={{ color: "red" }}></i>
                  &nbsp;Home<span className="sr-only">(current)</span>
                </a>
              </li>
              <Fragment>{token ? AuthLinks : GuestLinks}</Fragment>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0 ml-auto ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="fab fa-2x fa-accessible-icon"
                    style={{ color: "blue" }}
                  ></i>
                  &nbsp;Categories
                </a>
                {/* <br /> */}
                <ul
                  className="dropdown-menu category-list"
                  aria-labelledby="navbarDropdown"
                >
                  {!loading && categories.length > 0 ? showCategories : null}
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link active"
                  aria-current="page"
                >
                  <i className="fab fa-2x fa-product-hunt"></i>&nbsp;Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link active">
                  <i
                    className="fas fa-2x fa-shopping-cart"
                    style={{ color: "purple" }}
                  ></i>
                  &nbsp;Cart
                </Link>
              </li>

              <br />
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutCustomer })(Navbar);
