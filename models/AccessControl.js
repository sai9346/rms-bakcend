const mongoose = require('mongoose');

const accessControlSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  grantedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessControl', accessControlSchema);
