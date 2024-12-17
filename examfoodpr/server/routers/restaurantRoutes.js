const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant, assignAdmin } = require("../controllers/restaurantController");
const restaurantrouter = express.Router();
// const restaurantController = require("../controllers/restaurantController"); // Assuming controller is at controllers/restaurantController.js

// 1. Create a new restaurant
restaurantrouter.post("/", authMiddleware, createRestaurant);

// 2. Get all restaurants
restaurantrouter.get("/", getAllRestaurants);

// 3. Update a restaurant by ID
restaurantrouter.patch("/:id", authMiddleware, updateRestaurant);

// 4. Delete a restaurant by ID
restaurantrouter.delete("/:id", authMiddleware, deleteRestaurant);

// 5. Assign an admin to a restaurant
restaurantrouter.post("/:id/assign-admin", authMiddleware, assignAdmin);

module.exports = restaurantrouter;
