const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            product: {
                type: Object,
                ref: "Product",
            },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice:{
        type:Number
    },
    shippingCost:{
        type:Number,
    },
    tax:{
        type:Number,
    },
    paidStatus:{
        type:Boolean,
        default:false
    },
    paymentMethod: {
        type: String,
        default: "Cash on delivery",
        enum: ["Cash on delivery", "Khalti", "Esewa"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deliveryStatus: {
        type: String,
        default: "On process",
        enum: ["Pending", "On process", "Delivered"]
    },
    orderStatus:{
        type:String,
        default:"Placed",
        enum:["Placed","Cancelled"],
    },
    date: { type: Date, default: Date.now },
    
    address: {
        country:{
            type:String,
        },
        fullName:{
            type:String,
        },
        streetAddress:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        zipCode:{
            type:Number
        },
        phoneNumber:{
            type:Number
        },
    }

})

module.exports = mongoose.model("Order", OrderSchema)