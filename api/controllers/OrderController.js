const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { validationResult } = require("express-validator");

// to send sms
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// place order by customer


// .......................customer..................

exports.placeOrder = async (req, res, next) => {
  // const cart=await Cart({user:req.user.id}).populate('products._id');
  // console.log(cart);
  // const cart=await Cart.findOne({user:req.user.id}).populate('products._id').populate({path:'user',select:'email'});
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products._id"
    );
    if (cart == null) {
      return res.status(404).json({ msg: "User cart is empty" });
    }
    // console.log(cart);
    if (cart.products.length == 0) {
      return res.status(404).json({ msg: "User cart is empty" });
    }
    const products = cart.products.map((i) => {
      return { quantity: i.quantity, product: { ...i._id._doc } };
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      country,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
    } = req.body;
    const address = {};
    if (country) address.country = country;
    if (fullName) address.fullName = fullName;
    if (streetAddress) address.streetAddress = streetAddress;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (phoneNumber) address.phoneNumber = phoneNumber;

    // generate total price of products including shipping cost
    const price = cart.products.map((i) => {
      return i.quantity * i._id.price;
      //  return i.quantity*i._id.price
    });
    let total = 0;
    for (let i = 0; i < price.length; i++) {
      total += price[i];
    }
    // console.log(total);
    // will add effective shipping and tax later
    const shippingCost = 0;
    const tax = 0;

    let totalPrice = total + shippingCost + tax;
    const newOrder = new Order({
      user: req.user.id,
      products: products,
      address: address,
      totalPrice: totalPrice,
      shippingCost: shippingCost,
      tax: tax,
    });
    await newOrder.save();
    const order = await Order.find();
    const body = `Thank You!For choosing hamro pasal ${fullName}
    Your order will be deliver soon
    Order Summary`;
    // `Thank you for choosing hamro pasal,Your order will be delivered soon`
    client.messages
      .create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => {
        console.log(err);
      });


    // clearing cart of user after order processed
    cart.subTotal = 0;
    cart.products = [];
    await cart.save();
    return res.json({ newOrder, text: "Order place successfully." });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


// get all orders placed by user
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    // console.log(products);
    res.json({ orders });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};
// mongodb+srv://Sushil:<password>@cluster0.ongpn.mongodb.net/test


// cancel order by user who placed user
exports.cancelOrder = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (!order) {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    if (order.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "This order is not placed by you" });
    }
    order.orderStatus = "Cancelled";
    await order.save();
    res.json({ order });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};

// get order details by user who placed order
exports.orderDetails = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (!order) {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    if (order.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "This order is not placed by you" });
    }
    // order.orderStatus="Cancelled"
    // await order.save()
    res.json({ order });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};


// ............................change delivery status admin..............

exports.changeDeliveryStatus = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const deliveryStatus=req.body.status;
    const order = await Order.findById(orderID);
    if (!order) {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    // if (order.user.toString() !== req.user.id) {
    //   return res.status(404).json({ msg: "This order is not placed by you" });
    // }
    order.deliveryStatus = deliveryStatus
    await order.save();
    res.json({ order });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};

// get al orders by admin.............
exports.getOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find();
    // console.log(products);
    res.json({ orders });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


// get order details by admin who placed order
exports.orderDetailsAdmin = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (!order) {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    // if (order.user.toString() !== req.user.id) {
    //   return res.status(404).json({ msg: "This order is not placed by you" });
    // }
    // order.orderStatus="Cancelled"
    // await order.save()
    res.json({ order });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};
