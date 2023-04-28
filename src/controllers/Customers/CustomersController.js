const mongoose = require('mongoose');
const DataModel = require("../../models/Customers/CustomersModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const SalesModel = require("../../models/Sales/SalesModel");
const ReturnsModel = require("../../models/Returns/ReturnsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");


exports.CreateCustomers = async (req, res) => {
    let Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateCustomers = async (req, res) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

// in brand and category we have only one search field but in customer we have multiple search fields
exports.CustomersList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ CustomerName: SearchRgx }, { Phone: SearchRgx }, { Email: SearchRgx }, { Address: SearchRgx }]
    let Result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(Result)
}

exports.CustomersDropDown = async (req, res) => {
    let Result = await DropDownService(req, DataModel, { _id: 1, CustomerName: 1 })
    res.status(200).json(Result)
}


exports.DeleteCustomer = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckSalesAssociate = await CheckAssociateService({ CustomerID: new ObjectId(DeleteID) }, SalesModel);
    let CheckReturnAssociate = await CheckAssociateService({ CustomerID: new ObjectId(DeleteID) }, ReturnsModel);
    if (CheckSalesAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Sales" })
    } else if (CheckReturnAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Return" })
    }
    else {
        let Result = await DeleteService(req, DataModel);
        res.status(200).json(Result)
        // res.send('customer deleted')
    }
}

exports.CustomersDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}