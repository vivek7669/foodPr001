const {Router} = require('express');
const foodRoute = Router();
const { addFood, getAllFoods, updateFood, deleteFood } = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');

// Add Food (Protected Route - Only Admin can add food)
foodRoute.post('/:restaurantId', authMiddleware, addFood);

// Get All Foods for a Restaurant (Public or Authenticated User)
foodRoute.get('/:restaurantId', getAllFoods);

// Update Food by ID (Protected Route - Only Admin can update food)
foodRoute.patch('/:id', authMiddleware, updateFood);

// Delete Food by ID (Protected Route - Only Admin can delete food)
foodRoute.delete('/:id', authMiddleware, deleteFood);

module.exports = foodRoute;
