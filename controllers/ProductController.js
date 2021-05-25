const {validationResult}=require("express-validator");

const Product = require("../models/Product");
var mongoose = require('mongoose');

// add product by admin
exports.addProduct=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const selectedFile=req.file;
    if(!selectedFile){
        return res.status(400).json({ errors: [{ msg: "Attached file is not image" }] });
    }
    const photoURL=selectedFile.path;
    try{
        const categoryID=req.params.categoryID
        // console.log(categoryID);
        // console.log(req.body);
        const newProduct=new Product({
        categoryID:mongoose.Types.ObjectId(categoryID),
        ownerID:req.user.id,
        title:req.body.title,
        description:req.body.description,
        photo:photoURL,
        price:req.body.price,
        stockQuantity:req.body.stockQuantity
    })
    const product= await newProduct.save();
    return res.json({ product});
    }
    catch(err){
        return res.status(500).send("Server error");

    }
    
}


// edit product by admin
exports.editProduct=async(req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const selectedFile=req.file;
    if(!selectedFile){
        return res.status(400).json({ errors: [{ msg: "Attached file is not image" }] });
    }
    const photoURL=selectedFile.path;
    try{
        const categoryID=req.params.categoryID;
        const productID=req.params.productID;
        const product=await Product.findById(productID)
        console.log(product);
        if(!product){
            return res.status(404).json({ msg: "Product not found with that id" });
        }
        if(product.ownerID.toString() !== req.user.id){
            return res.status(404).json({ msg: "You are not the owner of this product" });
        }
        product.categoryID=categoryID;
        product.ownerID=req.user.id;
        product.title=req.body.title;
        product.description=req.body.description;
        product.photo=photoURL;
        product.stockQuantity=req.body.stockQuantity;

        const updatedProduct=await product.save();
        return res.json({updatedProduct});
    }
    catch(err){
         if (err.kind === "ObjectId") {
         return res.status(404).json({ msg: "Product not found with that id" });
        }
        return res.status(500).send("Server error");

    }
}
//Delete products by admin

exports.deleteProduct=async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.productID);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    if (product.ownerID.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You are not the owner of this product" });
    }
    await product.remove();
    res.json({ msg: "Product removed sucessfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    return res.status(500).send("Server error");
  }

}

// get-all products by owner controller
exports.getProducts=async(req,res,next)=>{
    // console.log(req.user.id);
  try{
    const products=await Product.find().populate('categoryID');
    // const products=await Product.find({ownerID:req.user.id});
    // console.log(products);
    res.json({products});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}



// get product with id by owner
exports.getMyProduct=async(req,res,next)=>{
  try{
    const productID=req.params.productID;
  const product=await Product.findById(productID)
  if(!product){
    return res.status(404).json({ msg: "Product not found with that id" });
  }
  if(product.ownerID.toString() !== req.user.id){
      return res.status(404).json({ msg: "You are not the owner of this product" });
        }
  res.json({product});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    return res.status(500).send("Server error");

  }
  
}


/*................custoer controller ...............*/
// get all products by customers

exports.allProducts=async(req,res,next)=>{
  try{
    const products=await Product.find().populate('categorID');
    // console.log(products);
    res.json({products});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}

// get Products by category ..customer

exports.productsByCategory=async(req,res,next)=>{
  try{
    const products=await Product.find({categoryID:req.params.categoryID}).populate('categorID');
    // console.log(products);
    res.json({products});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Products not found with that category" });
    }
    return res.status(500).send("Server error");
  }

}

// get Products by category and filter by price

exports.productsByCategoryPrice=async(req,res,next)=>{
   let price=req.params.price;
    let sort=1;
    if(price ==1 || price ==-1){
      sort=price
    }
  try{
    const products=await Product.find({categoryID:req.params.categoryID}).sort({price:sort});
    res.json({products});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Products not found with that category" });
    }
    return res.status(500).send("Server error");
  }

}

// get Products by category and filter by date

exports.productsByCategoryDate=async(req,res,next)=>{
   let date=req.params.date;
    let sort=1;
    if(date ==1 || date ==-1){
      sort=date
    }
  try{
    const products=await Product.find({categoryID:req.params.categoryID}).sort({date:sort});
    res.json({products});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Products not found with that category" });
    }
    return res.status(500).send("Server error");
  }

}



// get product by id by customer

exports.getProduct=async(req,res,next)=>{
  try{
    const productID=req.params.productID;
  const product=await Product.findById(productID).populate('categoryID')
  // console.log(product);
  if(!product){
    return res.status(404).json({ msg: "Product not found with that id" });
  }
  return res.json({product});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found with that id" });
    }
    return res.status(500).send("Server error");

  }
  
}

// sort products by price
exports.sortByPrice=async(req,res,next)=>{
    // console.log(req.user.id);
    let price=req.params.price;
    let sort=1;
    if(price ==1 || price ==-1){
      sort=price
    }
   
  try{
    // const sort=req.params.price;
    const products=await Product.find().sort({price:sort});
    // console.log(products);
    res.json({products});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}

// sort product by date
exports.sortByDate=async(req,res,next)=>{
    // console.log(req.user.id);
    let date=req.params.date;
    let sort=1;
    if(date ==1 || date ==-1){
      sort=date
    }
   
  try{
    // const sort=req.params.price;
    const products=await Product.find().sort({date:sort});
    // console.log(products);
    res.json({products});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}

exports.searchProduct=async(req,res,next)=>{
  let title=req.params.title;
  try{
  if (title == null){
    const products=await Product.find();
    return res.json({products});

  }
     const products=await Product.find({title: {$regex: title, $options: 'i'}})
      return res.json({products});

      // console.log(products);
  }
  catch(err){
    return res.status(500).send("Server error");
  } 
}

exports.searchCategoryProduct=async(req,res,next)=>{
  try{
    const title=req.params.title;
    const products=await Product.find({categoryID:req.params.categoryID,title: {$regex: title, $options: 'i'}});
    // console.log(products);
    return res.json({products});
  }
  catch(err){
     if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Products not found with that category" });
    }
    return res.status(500).send("Server error");
  }

}

exports.rangeProducts=async(req,res,next)=>{
  const initial=req.params.initial;
  const final=req.params.final;
  // console.log(initial);
  // console.log(final)
  try{
    const products=await Product.find({price:{$gte:initial,$lte:final}});
    console.log(products);
    res.json({products});
  }
  catch(err){
    return res.status(500).send("Server error");
  }
}