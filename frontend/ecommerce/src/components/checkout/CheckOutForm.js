import React, { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Cart from "../Cart/Cart";



import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { placeOrder } from "../../actions/order";
import { useDispatch } from "react-redux";
const CheckoutForm = ({ show, setShow, handleClose, handleShow }) => {
const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const {
    country,
    fullName,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
  } = formData;

  const onChange =async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const proceedCheckout=async()=>{
        dispatch(placeOrder(formData))
        handleClose()
    }
  return (
    <Fragment>
      {/* <Cart> */}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div> */}
          {/* <div className="py-12"> */}
          {/* <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">  */}
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="flex flex-row">
                <h2 className="text-3xl font-semibold">Hamro</h2>
                <h2 className="text-3xl text-green-400 font-semibold">Pasal</h2>
              </div>
              <div className="flex flex-row pt-2 text-xs pt-6 pb-5">
                {" "}
                <span className="font-bold">Information</span>{" "}
                <small className="text-gray-400 ml-1"></small>{" "}
                <span className="text-gray-400 ml-1">Shopping</span>{" "}
                <small className="text-gray-400 ml-1"></small>{" "}
                <span className="text-gray-400 ml-1">Payment</span>{" "}
              </div>{" "}
              <span>Customer Information</span>
              <br />
              <small>
                  * Required field
              <br />
                  * Phone Number required
              </small>
              <br />
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                }}
                onChange={(phoneNumber)=>setFormData({phoneNumber})}
              />
              <br />
              <input
                type="text"
                name="fullName"
                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Full Name*"
                value={fullName}
                onChange={(e) => onChange(e)}
              />{" "}
              <input
                type="text"
                name="country"
                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Country*"
                value={country}
                onChange={(e) => onChange(e)}
              />
              <input
                type="text"
                name="streetAddress"
                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Street Address (optional)"
                value={streetAddress}
                onChange={(e) => onChange(e)}
              />{" "}
              <div className="grid md:grid-cols-3 md:gap-2">
                <input
                  type="text"
                  name="zipCode"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Zipcode (optional)"
                  value={zipCode}
                onChange={(e) => onChange(e)}
                />
                <input
                  type="text"
                  name="city"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="City (optional)"
                  value={city}
                onChange={(e) => onChange(e)}
                />{" "}
                <input
                  type="text"
                  name="state"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="State(optional)"
                  value={state}
                onChange={(e) => onChange(e)}
                />{" "}
              </div>{" "}
              
              <div className="flex justify-between items-center pt-2">
                {" "}
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-12 w-24 text-blue-500 text-xs font-medium"
                >
                  Return to cart
                </button>
                <button
                  type="button"
                    onClick={proceedCheckout}
                  //   className="btn btn-danger"
                  className="h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white"
                >
                  Continue to Shipping
                </button>{" "}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* </Cart> */}
    </Fragment>
  );
};

export default CheckoutForm;
