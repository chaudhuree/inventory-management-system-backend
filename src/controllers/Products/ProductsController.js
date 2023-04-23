const DataModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");



exports.CreateProducts=async (req, res) => {
    let Result= await CreateService(req,DataModel);
    res.status(200).json(Result)
}

exports.UpdateProducts=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}
