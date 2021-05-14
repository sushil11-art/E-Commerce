const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.addToCart = async (req, res, next) => {
  const productID = req.params.productID;
  // console.log(productID);
  let cart = await Cart.find({ user: req.user.id });
  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    // console.log(cart);
    if (cart.length == 0) {
      const newCart = new Cart();
      newCart.user = req.user.id;
      newCart.products.push({ _id: req.params.productID, quantity: 1,ownerID:product.ownerID });
      newCart.subTotal = product.price;
      await newCart.save();
      const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
      return res.json({ carts });
    }
    const cartProductIndex = await cart[0].products.findIndex((cp) => {
      // console.log(cp);
      return cp._id.toString() == productID.toString();
    });
    // console.log(cartProductIsndex);
    let quantity = 1;
    if (cartProductIndex >= 0) {
      cart[0].products[cartProductIndex].quantity =
        cart[0].products[cartProductIndex].quantity + 1;
      cart[0].subTotal = cart[0].subTotal + product.price;
      await cart[0].save();
      const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
      return res.json({carts });
    }
    else{
    cart[0].products.push({ _id: req.params.productID, quantity: quantity,ownerID:product.ownerID});
    cart[0].subTotal = cart[0].subTotal + product.price;
    await cart[0].save();
    const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
    return res.json({ carts });
    }
  
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};

exports.removeFromCart = async (req, res, next) => {
  const productID = req.params.productID;
  let cart = await Cart.find({ user: req.user.id });
  if (cart.length == 0) {
    return res.status(404).json({ msg: "User has not added anything to cart" });
  }

  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    const cartProductIndex =await cart[0].products.findIndex((cp) => {
      return cp._id.toString() == productID.toString();
    });
    if (
      cartProductIndex >= 0 &&
      cart[0].products[cartProductIndex].quantity > 0
    ) {
      cart[0].products[cartProductIndex].quantity =
        cart[0].products[cartProductIndex].quantity - 1;
      cart[0].subTotal = cart[0].subTotal - product.price;
      // console.log(cart[0].products[cartProductIndex].quantity);
      await cart[0].save();
      if (cart[0].products[cartProductIndex].quantity == 0) {
        cart[0].products.splice(cartProductIndex, 1);
        await cart[0].save();
        const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
        return res.json({carts});
      }
      const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
      return res.json({ carts });
    }
    if(cartProductIndex < 0){
        cart[0].subTotal=0
        await cart[0].save();
    }
    return res
      .status(404)
      .json({ msg: "No more item left of that id in cart " });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};

exports.getCart=async(req,res,next)=>{
  try{
     const carts = await Cart.findOne({ user: req.user.id }).deepPopulate("products._id.categoryID").exec();
    //  console.log(cart);
     return res.json({carts});
  }
  catch(err){
    return res.status(500).send("Server error");

  }
}