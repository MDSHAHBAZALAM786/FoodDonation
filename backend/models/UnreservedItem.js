const mongoose = require("mongoose");

const unreservedItemSchema = new mongoose.Schema(
  {
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductDetail", required: true },
    itemName: { type: String, required: true },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UnreservedItem", unreservedItemSchema);
