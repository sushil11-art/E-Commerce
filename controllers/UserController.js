const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {OAuth2Client} = require('google-auth-library');

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.registerCustomer=async(req,res,body)=>{
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: " User with that email already exists" }] });
    }
    // create new user
    user = new User({
      name,
      email,
      password,
    });
    // hash the password using gen salt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // let saveUser = await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }

}

exports.registerAdmin=async(req,res,body)=>{
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: " User with that email already exists" }] });
    }
    // create new user
    user = new User({
      name,
      email,
      password,
    });
    // hash the password using gen salt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.role="admin"
    await user.save();
    // let saveUser = await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }

}

exports.loginCustomer=async(req,res,body)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentias" }] });
    }
    // check whether that user is customer or not
    if(user.role !== "customer"){
      return res.status(400).json({ errors: [{ msg: "Please login from valid portal" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentias" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    return res.status(500).send("Server error");
  }  
}

exports.googleLogin=async(req,res,next)=>{
  // console.log(req.body);
  const {tokenId}=req.body;
  const response=await client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID})
  const {email_verified,email,name}=response.payload;
  try{
      let user = await User.findOne({ email });
    if (user && user.role=="customer") {
      const payload = {
      user: {
        id: user.id,
      },
    };
    const token=await jwt.sign(payload,process.env.TOKEN_SECRET)
    let safeUser={...user._doc};
    delete safeUser.password
    return res.json({ token,user:safeUser });

    // jwt.sign(
    //   payload,
    //   process.env.TOKEN_SECRET,
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if (err) throw err;
    //   }
    // );
    }
    else if (user && user.role!=="customer"){
      return res.status(400).json({ errors: [{ msg: "Please login from valid portal" }] });
    }
    const newuser=new User({
      name:name,
      email:email,
      password:''
    })
    await newuser.save();
    const payload={
      user:{
        id:newuser.id
      }
    }
    const token =await jwt.sign(payload,process.env.TOKEN_SECRET);
    let safeUser={...newUser._doc};
    delete safeUser.password
    return res.json({ token,user:safeUser });
   
  } 
  catch(err){
    return res.status(500).send("Server error");

  } 
}