const mongoose = require("mongoose");
const express = require("express");
const { placeOrder, getMyOrders, cancelOrder ,orderDetails } = require("../controllers/OrderController");
const auth = require("../middleware/auth");
const router = express.Router();
const { body, validationResult } = require("express-validator");


// place order by customer
router.post(
  "/placeOrder",
  [
    auth,
    [
      body("phoneNumber", "Must enter a valid phone number").not().isEmpty().isMobilePhone(),
      body("fullName", "Please enter full name").not().isEmpty(),
      body("country", "Enter country name").not().isEmpty(),
        
    ],
  ],
  placeOrder
);

// getl all orders of respective customer
router.get("/getMyOrders",[auth],getMyOrders);


// cancel order by customer
router.post("/cancel-order/:orderID",[auth],cancelOrder);

// get order details by customer

router.get("/order-details/:orderID",[auth],orderDetails);



module.exports = router;
