const Category = require("../models/Category");
const { validationResult } = require("express-validator");


// add-category controller
exports.addCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
      // const category=await Category.find({name:req.body.name})
      // if(category){
      //     return res.status(404).json({ errors: [{ msg: " Category already exists" }] });
      // }
      const newCategory=new Category({
          name:req.body.name,
          user:req.user.id
      })
      // console.log(newCategory);
      await newCategory.save();
      // console.log(category);
      return res.json({ category:newCategory});
  }
  catch(err){
    return res.status(500).send("Server error");

  }
};

// edit-category controller

exports.editCategory=async(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const categoryId=req.params.id;
    const name=req.body.name;
    // console.log(categoryId);
    // console.log(name);
    try{

      const category=await Category.findById(categoryId);
      // console.log(category);
      if(!category){
        return res.status(404).json({ msg: "Category not found with that id" });
      }
      if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "USer not authorized" });
      }
      category.name=name;
      category.user=req.user.id;
      const editCategory=await category.save();
      return res.json({category:editCategory});
    }
    catch(err){
      if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found with that id" });
    }
    return res.status(500).send("Server error");
        
    }
}

// delete-category controller
exports.deleteCategory=async(req,res,next)=>{
    try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found with that id" });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "USer not authorized" });
    }
    await category.remove();
    res.json({ msg: "Category removed sucessfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found with that id" });
    }
    return res.status(500).send("Server error");
  }

}


// delete-category controller
exports.getCategory=async(req,res,next)=>{
    try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found with that id" });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "USer not authorized" });
    }
    // await category.remove();
    res.json({ category });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found with that id" });
    }
    return res.status(500).send("Server error");
  }

}



exports.adminCategories=async(req,res,next)=>{
  try{
    const categories=await Category.find({user:req.user.id});
    // console.log(categories)
    res.json({categories});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}



// get-all categories controller

exports.getCategories=async(req,res,next)=>{
  try{
    const categories=await Category.find();
    // console.log(categories)
    res.json({categories});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}
