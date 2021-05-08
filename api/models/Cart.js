const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    },
  ],
  subTotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
