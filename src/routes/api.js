const express = require('express');
// middleware for verify token and authorization
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
// user controller for CRUD and reset password
const UsersController = require("../controllers/Users/UsersController");
// brands controller 
const BrandsController = require("../controllers/Brands/BrandsController");
// categories controller
const CategoriesController = require("../controllers/Categories/CategoriesController");
// customer controller
const CustomersController = require("../controllers/Customers/CustomersController");
// suppliers controller
const SuppliersController = require("../controllers/Suppliers/SuppliersController");
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

// Customers
router.post("/CreateCustomers", AuthVerifyMiddleware, CustomersController.CreateCustomers);
router.post("/UpdateCustomers/:id", AuthVerifyMiddleware, CustomersController.UpdateCustomers);
router.get("/CustomersList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CustomersController.CustomersList);
router.get("/CustomersDropDown", AuthVerifyMiddleware, CustomersController.CustomersDropDown);

// Suppliers
router.post("/CreateSuppliers", AuthVerifyMiddleware, SuppliersController.CreateSuppliers);
router.post("/UpdateSuppliers/:id", AuthVerifyMiddleware, SuppliersController.UpdateSuppliers);
router.get("/SuppliersList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, SuppliersController.SuppliersList);
router.get("/SuppliersDropDown", AuthVerifyMiddleware, SuppliersController.SuppliersDropDown);


module.exports = router;