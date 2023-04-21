const express = require('express');
// middleware for verify token and authorization
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
// user controller for CRUD and reset password
const UsersController = require("../controllers/Users/UsersController");
// brands controller 
const BrandsController = require("../controllers/Brands/BrandsController");
// categories controller
const CategoriesController = require("../controllers/Categories/CategoriesController");

const router = express.Router();


// User Profile
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.post("/ProfileUpdate", AuthVerifyMiddleware, UsersController.ProfileUpdate);
router.get("/ProfileDetails", AuthVerifyMiddleware, UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

// Brands
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
router.post("/UpdateBrand/:id", AuthVerifyMiddleware, BrandsController.UpdateBrand);
router.get("/BrandList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, BrandsController.BrandList);
router.get("/BrandDropDown", AuthVerifyMiddleware, BrandsController.BrandDropDown);


// Categories
router.post("/CreateCategories", AuthVerifyMiddleware, CategoriesController.CreateCategories);
router.post("/UpdateCategories/:id", AuthVerifyMiddleware, CategoriesController.UpdateCategories);
router.get("/CategoriesList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CategoriesController.CategoriesList);
router.get("/CategoriesDropDown", AuthVerifyMiddleware, CategoriesController.CategoriesDropDown);


module.exports = router;