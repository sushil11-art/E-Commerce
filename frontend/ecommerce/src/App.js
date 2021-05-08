import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import ProductList from "./components/Product/ProductList";
import Category from "./components/Product/Category";
import Cart from "./components/Cart/Cart";

import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
// import Cart from './components/Cart/Cart';

// redux
// import {useDispatch } from "react-redux";
// import store from "./store";
import Alert from "./components/layouts/Alert";
import { useEffect } from "react";
import ProductDetails from "./components/Product/ProductDetails";
// import { loadCurrentUser } from "./actions/auth";



function App() {
  // const dispatch=useDispatch();
  useEffect(()=>{
    // dispatch(loadCurrentUser())
  },[])
  return (
    // <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <div class="background-caraousel">
            <Route exact path="/" component={Landing} />
          </div>
          <Switch>
            <Route exact path="/products" component={ProductList} />
            <Route
              exact
              path="/product/:productID"
              component={ProductDetails}
            />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/category/:categoryID" component={Category} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Fragment>
      </Router>
    // </Provider>
  );
}

export default App;

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",