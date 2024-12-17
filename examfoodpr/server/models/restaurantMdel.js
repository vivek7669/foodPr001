const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: String,
        location: String,
        createdBy: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "superadmin"
        },
        admins: [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "admin"
        }]
      },   
  { timestamps: true }
);


const restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurant;
