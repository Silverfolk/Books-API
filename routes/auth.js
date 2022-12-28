const express = require('express');

const authenticateRoute =express.Router();

const auth = require('../middleware/check-auth');
const { SignUp,Login,Logout } = require('../controllers/auth');

authenticateRoute.route("/login").post(Login);
authenticateRoute.route("/logout").post( auth, Logout);
// authenticateRoute.route("/update-credentials").patch( auth, updateCredentials);
authenticateRoute.route("/signup").post(SignUp);


module.exports = authenticateRoute;