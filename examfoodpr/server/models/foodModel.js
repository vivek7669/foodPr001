const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

const food = mongoose.model("food", foodSchema);

module.exports = food;
