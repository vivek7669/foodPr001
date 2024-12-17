const restaurant = require("../models/restaurantMdel");
const User = require("../models/userModel");

// 1. Create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, location, createdBy } = req.body;

    if (req.user.role == "superadmin") {
      if (!name || !location || !createdBy) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newRestaurant = new restaurant({
        name,
        location,
        createdBy,
      });

      await newRestaurant.save();
      res
        .status(201)
        .json({
          message: "Restaurant created successfully",
          restaurant: newRestaurant,
        });
    }
    else{
        res.status(400).json({ message: "you are Not Authorizd !" });
    }
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get all restaurants
const getAllRestaurants = async (req, res) => {
    if (req.user.role == "superadmin") {
        try {
            const restaurants = await restaurant.find();
            res.status(200).json({ restaurants });
          } catch (error) {
            console.error("Error fetching restaurants:", error);
            res.status(500).json({ message: "Server error" });
          }
    }
    else{
        res.status(400).json({ message: "you are Not Authorizd !" });
    }
};

// 3. Update a restaurant by ID
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (req.user.role == "superadmin") {
      try {
        const updatedRestaurant = await restaurant.findByIdAndUpdate(
          id,
          { name, location },
          { new: true } // Return the updated restaurant
        );
      
        if (!updatedRestaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
      
        res
          .status(200)
          .json({
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant,
          });
      } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Server error" });
      }
}
else{
    res.status(400).json({ message: "you are Not Authorizd !" });
}

};

// 4. Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  if (req.user.role == "superadmin") {
      try {
        const deletedRestaurant = await restaurant.findByIdAndDelete(id);
      
        if (!deletedRestaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
      
        res.status(200).json({ message: "Restaurant deleted successfully" });
      } catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).json({ message: "Server error" });
      }
}
else{
  res.status(400).json({ message: "you are Not Authorizd !" });
}
};

// 5. Assign an admin to a restaurant
const assignAdmin = async (req, res) => {
  const { id } = req.params;
  const { adminId } = req.body;

  if (req.user.role == "superadmin") {
    try {
        // Find the restaurant by ID
        const restaurantdata = await restaurant.findById(id);
    
        if (!restaurantdata) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
    
        // Find the user (admin) by ID
        const admin = await User.findById(adminId);
    
        if (!admin) {
          return res.status(404).json({ message: "Admin user not found" });
        }
    
        // Add the admin to the restaurant's admins list
        if (!restaurantdata.admins.includes(adminId)) {
          restaurantdata.admins.push(adminId);
          await restaurantdata.save();
        }
    
        res
          .status(200)
          .json({ message: "Admin assigned to restaurant", restaurant });
      } catch (error) {
        console.error("Error assigning admin:", error);
        res.status(500).json({ message: "Server error" });
      }
}
else{
res.status(400).json({ message: "you are Not Authorizd !" });
}
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  assignAdmin,
};
