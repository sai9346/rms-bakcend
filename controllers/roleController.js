const Role = require('../models/Role');

// Create a new role
const createRole = async (req, res) => {
  const { name, accessLevel } = req.body;

  // Input validation
  if (!name || !accessLevel) {
    return res.status(400).json({ message: 'Name and access level are required' });
  }

  try {
    const newRole = new Role({ name, accessLevel });
    await newRole.save();
    res.status(201).json({
      message: 'Role created successfully',
      role: newRole
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error: error.message });
  }
};

// Update a role
const updateRole = async (req, res) => {
  const { roleId } = req.params;
  const { name, accessLevel } = req.body;

  // Input validation
  if (!name && !accessLevel) {
    return res.status(400).json({ message: 'At least one field (name or access level) must be provided' });
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(roleId, { name, accessLevel }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole
};
