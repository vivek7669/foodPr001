const food = require("../models/foodModel");
const restaurant = require("../models/restaurantMdel");

// Add Food
const addFood = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { restaurantId } = req.params;
    const createdBy = req.user._id;  // Assuming the admin user is logged in and the JWT token is used for authentication

    if (req.user.role == "admin") {
    const restaurantdata = await restaurant.findById(restaurantId);
    if (!restaurantdata) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newFood = new food({
      name,
      price,
      description,
      restaurantId,
      createdBy
    });

    await newFood.save();
    return res.status(201).json(newFood);
}
else{
    return res.status(400).json({ message: "You are Not Auntunticated !" });
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while adding food" });
  }
};

// Get All Foods by Restaurant ID
const getAllFoods = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foods = await food.find({ restaurantId }).populate("restaurantId").populate("createdBy");

    if (foods.length === 0) {
      return res.status(404).json({ message: "No foods found for this restaurant" });
    }

    return res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching foods" });
  }
};

// Update Food by ID
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    if (req.user.role == "admin") {
    const updatedFood = await food.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json(updatedFood);
}
else{
    return res.status(400).json({"message" : "you Are Not Authorized"});
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating food" });
  }
};

// Delete Food by ID
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role == "admin") {
    const deletedFood = await food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json({ message: "Food deleted successfully" });
}else{
    return res.status(400).json({ message: "You Are Not Authenticated !" });
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting food" });
  }
};

module.exports = { addFood, getAllFoods, updateFood, deleteFood };
