const mongoose = require("mongoose");
const express = require("express");
const {
  placeOrder,
  getMyOrders,
  cancelOrder,
  OrderPlaceById,
  orderDetails,
  orderDetailsSuperAdmin,
  changeDeliveryStatusSuperAdmin,
  getOrdersSuperAdmin,
  getStatusOrderProductAdmin,
} = require("../controllers/OrderController");
const auth = require("../middleware/auth");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// place order by customer
router.post(
  "/placeOrder",
  [
    auth,
    [
      body("phoneNumber", "Must enter a valid phone number")
        .not()
        .isEmpty()
        .isMobilePhone(),
      body("fullName", "Please enter full name").not().isEmpty(),
      body("country", "Enter country name").not().isEmpty(),
    ],
  ],
  placeOrder
);

// getl all orders of respective customer
router.get("/getMyOrders", [auth], getMyOrders);

// cancel order by customer
router.post("/cancel-order/:orderID", [auth], cancelOrder);


router.post("/place-order/:orderID", [auth],OrderPlaceById);


// get order details by customer

router.get("/order-details/:orderID", [auth], orderDetails);

// ........superadmin ..................admin.......................................................

// change delivery status by super admin

router.post("/status/:orderID", [auth], changeDeliveryStatusSuperAdmin);

// get all ordersby  superadmin..........
router.get("/order-superadmin", [auth], getOrdersSuperAdmin);

// get order details by superadmin
router.get(
  "/order-details-superadmin/:orderID",
  [auth],
  orderDetailsSuperAdmin
);

// .....admin protected router

// get staus of order products of respective owner
router.get("/status-product/:status", [auth],getStatusOrderProductAdmin);

module.exports = router;
