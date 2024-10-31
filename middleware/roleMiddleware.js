const User = require('../models/User');

const roleMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const hasRole = user.roles.some(role => requiredRoles.includes(role.role));
    if (!hasRole) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};

module.exports = roleMiddleware;
