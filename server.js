const express = require("express");

const mongoose = require("mongoose");

const path = require("path");

const cors = require("cors");

const bodyParser = require("body-parser");

const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();

// for passport
// const cookieSession=require('cookie-session');
// const passportSetup = require("./config/passport-setup");
// const passport = require("passport");



// const session = require("express-session");
// const session=require("client-sessions");
// var cookieParser = require("cookie-parser");



// pass
const app = express();


// app.use(
//   session({
//     secret: "Shh,its a secret!",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(cookieSession({
//     maxAge:24*60*60*1000,
//     keys:[process.env.cookieKey]

// }))


// passport initialize
// app.use(passport.initialize());
// app.use(passport.session());



// const passportConfig = require('./config/passport-setup')(passport);

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "/uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,POST');
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
	next();

});
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single(
    "selectedFile"
  )
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//import routes here
const users = require("./routes/users");

const category = require("./routes/category");

const product = require("./routes/product");

const cart = require("./routes/cart");

const order = require("./routes/order");

// const authRoutes = require("./routes/oauth-routes");

app.use("/api/users", users);

// google auth routes
// app.use("/auth", authRoutes);

app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/cart", cart);
app.use("/api/order", order);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Connected to db");
    console.log("App will be run on port 4000");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
