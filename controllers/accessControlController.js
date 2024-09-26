const AccessControl = require('../models/AccessControl');

// Grant Access Control
exports.grantAccess = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const newAccessControl = new AccessControl({ userId, roleId });
    await newAccessControl.save();
    res.status(201).json({ message: 'Access control granted', accessControl: newAccessControl });
  } catch (error) {
    res.status(400).json({ message: 'Error granting access control', error });
  }
};

// Get Access Controls
exports.getAccessControls = async (req, res) => {
  try {
    const accessControls = await AccessControl.find().populate('userId roleId');
    res.status(200).json(accessControls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching access controls', error });
  }
};
