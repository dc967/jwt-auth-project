const express = require('express');
const router = express.Router();
const {register , Login, refresh , Logout} = require('../controllers/auth_controller');

router.post('/register',register);
router.post('/login',Login);
router.post('/refresh',refresh);
router.post('/logout',Logout);

module.exports = router;