const express = require('express');
const {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

const router = express.Router();

router.post('/', createRole);
router.get('/', getAllRoles);
router.put('/:roleId', updateRole);
router.delete('/:roleId', deleteRole);

module.exports = router;
