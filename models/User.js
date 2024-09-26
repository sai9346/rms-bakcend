const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [
    {
      role: { type: String, enum: ['Job Post Editor', 'Candidate Reviewer', 'Interview Scheduler'] },
      accessLevel: { type: String, enum: ['View-only', 'Edit', 'Full Control'] }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
