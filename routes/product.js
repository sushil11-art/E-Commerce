const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// import controllers here
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  allProducts,
  sortByPrice,
  sortByDate,
  getMyProduct,
  getProduct,
  productsByCategory,
  productsByCategoryDate,
  productsByCategoryPrice,
  searchProduct,
  searchCategoryProduct,
  rangeProducts
} = require("../controllers/ProductController");

// import middleware here
const auth = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");

/* ............owner routes for product......................*/

// add product by admin to respective category
router.post(
  "/add-product/:categoryID",
  [
    auth,
    [
      body("title", "Title is required").not().isEmpty(),
      body("description", "Description is required").not().isEmpty(),
      // body("price", "Must be an integer or floating number")
      //   .trim()
      //   .toFloat()
      //   .isFloat(),
      // body("stockQuantity", "Must be an integer value").trim().isInt(),
    ],
  ],
  addProduct
);

// edit product by owner
router.post(
  "/edit-product/:categoryID/:productID",
  [
    auth,
    [
      body("title", "Name is required").not().isEmpty(),
      body("description", "Description is required").not().isEmpty(),
      body("price", "Must be an integer or floating number")
        .trim()
        .toFloat()
        .isFloat(),
      body("stockQuantity", "Must be an integer value").trim().isInt(),
    ],
  ],
  editProduct
);

// delete product by owner of respective product
router.delete("/delete-product/:productID", [auth], deleteProduct);

// get all products by respective owner

router.get("/all-products",getProducts);

// get product with id

router.get("/:productID", [auth], getMyProduct);

/*
........customer routes ........... for getting product

*/

// show all products to customer
router.get("/customer/products", allProducts);


// get all products within price range 

router.get("/customer/products/:initial/:final",rangeProducts);

// show product with id

router.get("/customer/:productID", getProduct);

// show all products of respective category

router.get("/category-products/:categoryID", productsByCategory);

/*......................Category product sorting................ */
// get products of category and sort by price

/* supply -1 in params to sort from highest to lowest
  supply 1 in params to sort from low to high

*/

router.get("/category-products/:categoryID/:price", productsByCategoryPrice);

// get products of category and sort by date

/* supply -1 in params to sort from highest to lowest
  supply 1 in params to sort from low to high

*/

router.get("/category-products/:categoryID/:date", productsByCategoryDate);

/* ....................ALL PRODUCTS SORTING..............  */
// sorting products with price

/* supply -1 in params to sort from highest to lowest
  supply 1 in params to sort from low to high

*/

router.get("/sort-price-products/:price", sortByPrice);

// sorting products with date

/* supply -1 in params to sort from latest to  oldest
  supply 1 in params to sort from oldest to highest

*/

router.get("/sort-date-products/:date", sortByDate);

// search-all products
router.get("/search-product/:title", searchProduct);

// search-category product
router.get("/category/:categoryID/:title", searchCategoryProduct);





module.exports = router;
