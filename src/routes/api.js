const express = require('express');
// middleware for verify token and authorization
const AuthVerifyMiddleware=require("../middlewares/AuthVerifyMiddleware");
// user controller for CRUD and reset password
const UsersController=require("../controllers/Users/UsersController");

const router = express.Router();


// User Profile
router.post("/Registration",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.post("/ProfileUpdate",AuthVerifyMiddleware,UsersController.ProfileUpdate);
router.get("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass",UsersController.RecoverResetPass);


module.exports = router;