const express=require("express");
const { addToCart, removeFromCart } = require("../controllers/CartController");
const auth = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");
const router=express.Router();


router.post("/addProduct/:productID",[auth],addToCart);

router.delete("/removeProduct/:productID",[auth],removeFromCart);


module.exports=router;
