const DataModel = require("../../models/Users/UsersModel");
const OTPSModel = require("../../models/Users/OTPSModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");



exports.Registration = async (req, res) => {
    let Result = await UserCreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.Login = async (req, res) => {
    let Result = await UserLoginService(req, DataModel)
    res.status(200).json(Result)
}













