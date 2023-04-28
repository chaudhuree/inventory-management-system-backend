const mongoose = require("mongoose");
const DataModel = require("../../models/Brands/BrandsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const ProductsModel = require("../../models/Products/ProductsModel");
const DetailsByIDService = require("../../services/common/DetailsByIDService");


exports.CreateBrand = async (req, res) => {
    let Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}


exports.UpdateBrand = async (req, res) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}


exports.BrandList = async (req, res) => {

    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" } // i for case insensitive
    let SearchArray = [{ Name: SearchRgx }]

    let Result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(Result)
}


exports.BrandDropDown = async (req, res) => {
    let Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 })
    // 1 for include
    // so here we only want to include _id and Name
    res.status(200).json(Result)
}


exports.DeleteBrand = async (req, res) => {
    let DeleteID = req.params.id; // this is brand id to be deleted
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate = await CheckAssociateService({ BrandID: new ObjectId(DeleteID) }, ProductsModel);
    // without aggregation no need to use ObjectId
    // let CheckAssociate = await CheckAssociateService({ BrandID: DeleteID }, ProductsModel);
    if (CheckAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Product" })
    }
    else {
        // res.json({ "message": "Successfully Deleted" })
        let Result = await DeleteService(req, DataModel);
        res.status(200).json(Result)
    }
}

exports.BrandDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}