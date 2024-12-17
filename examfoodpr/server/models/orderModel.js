const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    foodItems: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
        },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "completed"],
    },
  },
  { timestamps: true }
);

const food = mongoose.model("food", foodSchema);

module.exports = food;
