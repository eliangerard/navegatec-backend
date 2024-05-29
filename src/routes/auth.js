const express = require('express');
const { getToken, refresh, verify, addAllowedUser } = require('../controllers/authController');
const verifySession = require('../middlewares/verifySession');
const auth = express.Router();

auth.get('/token', getToken);
auth.get('/refresh', refresh);
auth.get('/verify', verifySession, verify);
auth.post('/allow', verifySession, addAllowedUser);

module.exports = auth;