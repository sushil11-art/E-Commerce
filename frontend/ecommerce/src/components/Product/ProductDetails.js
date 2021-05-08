import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../actions/products";
// import Spinner from "../layouts/Spinner";

const ProductDetails = (props) => {
  const productID = props.match.params.productID;

  const dispatch = useDispatch();
  // console.log(productID);
  useEffect(() => {
    dispatch(productDetails(productID));
  }, [dispatch,productID]);
  const { product } = useSelector((state) => state.customerProduct);
  console.log(product);
  // const {product}= useSelector(state => state.customerProduct)
  return <div className="container">{product.title}</div>;
};
export default ProductDetails;
