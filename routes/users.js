const express = require("express");
const {
    registerCustomer,
    loginCustomer,
    registerAdmin,
    googleLogin
} = require("../controllers/UserController");

const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");



const router = express.Router();
router.post(
    "/registerCustomer",
    [
        body("name", "Name is required").not().isEmpty(),
        body("email", "Please enter a valid email").isEmail(),
        body(
            "password",
            "Please enter a password of atleast 7 character or more"
        ).isLength({ min: 7 }),
    ],
    registerCustomer
);

router.post(
    "/registerAdmin",
    [
        body("name", "Name is required").not().isEmpty(),
        body("email", "Please enter a valid email").isEmail(),
        body(
            "password",
            "Please enter a password of atleast 7 character or more"
        ).isLength({ min: 7 }),
    ],
    registerAdmin
);


router.post(
    "/loginCustomer",

    [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password is required").exists(),
    ],

    loginCustomer
);


router.post(
    "/googleLogin",
    googleLogin
);



router.get("/auth-protected",[auth] ,checkRole(["admin"]),async(req,res)=>{
    console.log(req);
    return res.json("Hello guys i am customer protected route")
})

// router.get("/auth-protected",[auth,checkRole["admin"]],async(req,res)=>{
//     console.log(req)
//     return res.json("Hello Guys I am admin protected route")
// }
// );

module.exports = router;
