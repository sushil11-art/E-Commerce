const express = require("express")
const router = express.Router();
const { body, validationResult } = require("express-validator");

// import middleware here
const auth = require("../middleware/auth");
const { checkRole } = require("../middleware/checkRole");

// import controllers here
const { addCategory, deleteCategory, editCategory, getCategories } = require("../controllers/CategoryController");

// will make super admin protected later

// /api/category/add-category
router.post('/add-category', [auth, [body("name", "Name is required").not().isEmpty(),]
], addCategory);

// /api/category/edit-category

router.post('/edit-category/:id', [auth, [body("name", "Name is required").not().isEmpty(),]
], editCategory);

// /api/category/delete-category

router.delete('/delete-category/:id', [auth], deleteCategory);

// get category by all user
router.get('/all-categories',[auth],getCategories);

module.exports = router;