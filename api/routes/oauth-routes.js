// const express = require("express");
// const router = express.Router();


// router.post("/google")
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

// // / auth with google
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // callback route for google to redirect
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", {
//     session: true,
//     failureRedirect: "/google/redirect",
//   }),
//   (req, res) => {
//     // console.log(req);
//     // req.logout()
//     // res.send(req.user);
//     // if(req.user){
//     //     req.session.save(function(err)
//     //         console.log(err);

//     //     });
//     // }
//     res.redirect("http://localhost:4000/auth/api/currentUser");
//   }
// );

// router.get("/api/currentUser", async(req, res) => {
//   console.log(req.user);
//   const payload={
//     user:''
//   }
//     // const payload=req.user
//    jwt.sign(
//       payload,
//       process.env.TOKEN_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         return res.json({ token });s
//       }
//     );
//     res.redirect("http://localhost:3000/products")  
// //   if(req.user !==null){

// // }
// //   return null;

//   // const payload=req.user

//   // res.send(req.user)
// });

// router.get("/logout" ,async(req,res)=>{
//   req.logout();
//   res.redirect("http://localhost:3000")

// })
// module.exports = router;
