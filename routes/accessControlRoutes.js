const express = require('express');
const { grantAccess, getAccessControls } = require('../controllers/accessControlController');
const router = express.Router();

router.post('/grant', grantAccess);
router.get('/', getAccessControls);

module.exports = router;
