const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
} = require('../controllers/userController');
const router = express.Router();

// Routes for user management
router.post('/', createUser); // Create a new user
router.get('/', getAllUsers); // Get all users
router.get('/:userId', getUserById); // Get a specific user by ID
router.put('/:userId', updateUser); // Update a specific user
router.delete('/:userId', deleteUser); // Delete a specific user
//  add user
// router.post("/users",addUser);   
module.exports = router;
