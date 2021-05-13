import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { productDetails } from "../../actions/products";
import {Link,useHistory,withRouter} from "react-router-dom"
// import Spinner from "../layouts/Spinner";
import { AddToCart } from "../../actions/cart";


const ProductDetails = (props) => {
  // console.log(localStorage.getItem("token"));
  const productID = props.match.params.productID;
  // console.log(productID);
  const dispatch = useDispatch();
  // console.log(productID);
  useEffect(() => {
    dispatch(productDetails(productID));
  }, [dispatch,productID]);
  const { product } = useSelector((state) => state.customerProduct);
  // console.log(product);
   const token = useSelector(state => state.auth.token)
  const browserHistory = useHistory();
  function AddProduct(productID){
    // console.log(productID);
    if(!token){
        browserHistory.push("/login")

    }
    dispatch(AddToCart(productID,props.history));
  }
  if (
    Object.keys(product).length !== 0
    // product !== null ||
    // (Object.keys(product).length == 0 && product.constructor == Object)
  ) {
 
    const {categoryID}=product;
     var str = product.photo;
      var url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
      // console.log(url);
      var source = "http://localhost:4000/uploads/" + url;

    return (
      <div className="product-details">
        <div className="container">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">PRODUCT CODE&nbsp;{product._id}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {product.title}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                      Description
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Reviews
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Details
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">{product.description}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Category</span>
                    <span className="ml-auto text-gray-900">{categoryID.name}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Available</span>
                  </div>
                       <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Color</span>
                    <span className="ml-auto text-gray-900">Available</span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Stock Quantity</span>
                    <span className="ml-auto text-gray-900">
                      {product.stockQuantity}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      Nrs.{product.price}
                    </span>
                    <button onClick={()=>AddProduct(product._id)} style={{backgroundColor:"red"}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                      Add to Cart
                    </button>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={source}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <section className="flex items-center h-full p-16 bg-coolGray-50 text-coolGray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-coolGray-400">
              <span className="sr-only">Error </span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl text-coolGray-600">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8">
              But dont worry, you can find plenty of other things on our
              products page
            </p>
            <Link
              to="/products"
              className="px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50"
            >
              Back to products page
            </Link>
          </div>
        </div>
      </section>
    );
  }
  // let url = str.replace("/home/sushil/2021/E-Commerce/api/uploads/", "");
  // console.log(product.photo);
  // const {categoryID}=product;
  // let {str}=product.photo
  // console.log(url);
  // var source = "http://localhost:4000/uploads/" + url;
  // const {product}= useSelector(state => state.customerProduct)
};
export default withRouter(ProductDetails);
