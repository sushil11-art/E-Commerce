import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  categoryProducts,
  categoryProductsCheapest,
  categoryProductsExpensive,
  categoryProductsNew,
  categoryProductsOld,
} from "../../actions/products";
// import camera from "./camera.jpg";
// import headphone from "./headphone.jpeg";
// import watch from "./watch.jpg";
import "./CategoryPagination.css";

import ReactPaginate from "react-paginate";
import Spinner from "../layouts/Spinner";

const Category = (props) => {
  // console.log(props.match.params.categoryID);
  const categoryID = props.match.params.categoryID;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryProducts(categoryID));
  }, [dispatch,categoryID]);

  const { products, loading } = useSelector((state) => state.customerProduct);

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 5;
  const pageVisted = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const cheapProducts = () => {
    dispatch(categoryProductsCheapest(categoryID, 1));
  };
  const expensiveProducts = () => {
    dispatch(categoryProductsExpensive(categoryID, -1));
  };
  const newProducts = () => {
    dispatch(categoryProductsNew(categoryID, -1));
  };
  const oldProducts = () => {
    dispatch(categoryProductsOld(categoryID, 1));
  };

  const renderProducts = products
    .slice(pageVisted, pageVisted + productsPerPage)
    .map((product) => {
      var str = product.photo;
      var url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
      // console.log(url);
      var source = "http://localhost:4000/uploads/" + url;
      return (
        <Fragment key={product._id}>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link
              to={`/product/${product._id}`}
              className="block relative h-48 rounded overflow-hidden"
            >
              <img
                alt="ecommerce"
                src={source}
                className="object-cover object-center w-full h-full block"
              />
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {product.categoryID}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {product.title}
              </h2>
              <p className="mt-1">Nrs.{product.price}</p>
            </div>
          </div>
        </Fragment>
      );
    });

  return loading && !products.length > 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="product-container">
        <br />
        <div className="product-header container px-5">
          <div>
            <ul className="navbar-nav mb-2 mb-lg-0 ml-auto ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="fab fa-2x fa-accessible-icon"
                    style={{ color: "red" }}
                  ></i>
                  &nbsp;Filter Products
                </a>
                {/* <br /> */}
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="active">
                    <a onClick={cheapProducts} className="dropdown-item">
                      Cheapest
                    </a>
                  </li>
                  <li className="active">
                    <a onClick={expensiveProducts} className="dropdown-item">
                      Expensive
                    </a>
                  </li>
                  <li className="active">
                    <a onClick={newProducts} className="dropdown-item">
                      Newest first
                    </a>
                  </li>
                  <li className="active">
                    <a onClick={oldProducts} className="dropdown-item">
                      Oldest first
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search product"
              aria-label="Search"
            />
            {/* <button className="btn btn-outline-success" style={{borderRadius :'0px'}} type="submit">Search</button> */}
            <button type="submit">
              <i className="fas fa-3x fa-search" type="submit"></i>
            </button>
          </form>
        </div>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">{renderProducts}</div>
            <br />
            <br />
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
        </section>
      </div>
    </Fragment>
  );
};

export default Category;
