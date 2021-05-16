const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
      ownerID:{type:Schema.Types.ObjectId,ref:"User"}
    },
  ],
  subTotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

CartSchema.plugin(deepPopulate)
module.exports = mongoose.model("Cart", CartSchema);
