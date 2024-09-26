const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  accessLevel: { type: String, enum: ['View-only', 'Edit', 'Full Control'], required: true }
});

module.exports = mongoose.model('Role', roleSchema);
