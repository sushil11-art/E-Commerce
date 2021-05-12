import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  customerProducts,
  filterProductsCheapest,
  filterProductsExpensive,
  filterProductsOld,
  filterProductsNew,
  searchProduct,
} from "../../actions/products";
// import camera from "./camera.jpg";
// import headphone from "./headphone.jpeg";
// import watch from "./watch.jpg";

// react pagination

import ReactPaginate from "react-paginate";
import Spinner from "../layouts/Spinner";
import { AddToCart } from "../../actions/cart";

const ProductList = () => {
  //  const classNamees = useStyles();

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 5;
  const pageVisted = pageNumber * productsPerPage;

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.customerProduct);

  useEffect(() => {
    dispatch(customerProducts());
  }, [dispatch]);

  // filter productss....................
  const cheapProducts = () => {
    dispatch(filterProductsCheapest(1));
  };
  const expensiveProducts = () => {
    dispatch(filterProductsExpensive(-1));
  };
  const newProducts = () => {
    dispatch(filterProductsNew(-1));
  };
  const oldProducts = () => {
    dispatch(filterProductsOld(1));
  };
  function AddProduct(productID){
    // console.log(productID);
    dispatch(AddToCart(productID));
  }
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
                CODE&nbsp;{product._id}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {product.title}
              </h2>
              <p className="mt-1">Nrs.{product.price}</p>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <button onClick={()=>AddProduct(product._id)} type="button" className="btn btn-danger" style={{width:'60%'}}><i class="fas fa-2x fa-cart-plus" style={{color:'red'}}></i>&nbsp;&nbsp;Add To cart</button>
            &nbsp;
            <button type="button" className="btn btn-primary" style={{width:'40%'}}><i class="fas fa-2x fa-heart" style={{color:'orange'}}></i>&nbsp;&nbsp;Wishlist</button>
            </div>
          </div>
        </Fragment>
      );
    });

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [formData, setFormData] = useState({
    search: "",
  });

  const onSearchProduct = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { search } = formData;
  // console.log(search)
  useEffect(() => {
    dispatch(searchProduct(search));
  }, [search, dispatch]);

  return loading && !products.length > 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="product-container">
        <br />
        <div class="product-header container px-5">
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
              name="search"
              value={search}
              placeholder="Search product"
              aria-label="Search"
              onChange={(e) => onSearchProduct(e)}
            />
            {/* <button className="btn btn-outline-success" style={{borderRadius :'0px'}} type="submit">Search</button> */}
            {/* <button> */}
            <i className="fas fa-3x fa-search"></i>
            {/* </button> */}
          </form>
        </div>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              {products.length > 0 ? (
                renderProducts
              ) : (
                <>
                  <div class="no-product">
                    <Spinner />
                    <h3>No products found,Please reload</h3>
                  </div>
                </>
              )}
            </div>
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

export default ProductList;
