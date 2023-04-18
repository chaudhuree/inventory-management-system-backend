const DataModel = require("../../models/Users/UsersModel");
const OTPSModel = require("../../models/Users/OTPSModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserDetailsService = require("../../services/user/UserDetailsService");



exports.Registration = async (req, res) => {
    let Result = await UserCreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.Login = async (req, res) => {
    let Result = await UserLoginService(req, DataModel)
    res.status(200).json(Result)
}

exports.ProfileUpdate=async (req, res) => {
    let Result=await UserUpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ProfileDetails=async (req, res) => {
    let Result=await UserDetailsService(req,DataModel)
    res.status(200).json(Result)
}












