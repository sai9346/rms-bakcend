const User = require('../models/User');
const { sendRegistrationLink } = require('../services/mailService');



// Create a new user
const createUser = async (req, res) => {
  const { name, email, roles } = req.body;
  if (!name || !email || !roles) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newUser = new User({ name, email, roles });
    await newUser.save();
    const registrationLink = `https://final-xi-ashy.vercel.app/team-registration/${newUser._id}`;


    // Send the registration link via email
    await sendRegistrationLink(email, registrationLink);

    res.status(201).json({ message: 'User created and registration email sent successfully', user: newUser });  } catch (error) {
      res.status(500).json({ message: 'Error creating user or sending email', error: error.message });
      }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log(getAllUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params; // Extract userId from request params
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update a specific user
const updateUser = async (req, res) => {
  const { userId } = req.params; // Extract userId from request params
  const { name, email, roles } = req.body; // Destructure request body
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, roles }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a specific user
const deleteUser = async (req, res) => {
  const { userId } = req.params; // Extract userId from request params
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};



//update user registration
const updateRegistration=async(req,res)=>{
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.registrationStatus = 'Registered'; // Update registration status
    await user.save();

    res.status(200).json({ message: 'User successfully registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming registration', error });
  }

}



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateRegistration,
};
