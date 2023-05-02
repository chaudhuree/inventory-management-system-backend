const ParentModel = require("../../models/Sales/SalesModel");
const ChildsModel = require("../../models/Sales/SaleProductsModel");
const CreateParentChildsServiceWithTransaction = require("../../services/common/CreateParentChildsServiceWithTransaction");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const DetailsByIDSaleService = require("../../services/common/DetailsByIDSaleService")



exports.CreateSales = async (req, res) => {
    let Result = await CreateParentChildsServiceWithTransaction(req, ParentModel, ChildsModel, 'SaleID');
    res.status(200).json(Result)
}

exports.SalesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "customers", localField: "CustomerID", foreignField: "_id", as: "customers" } };
    let SearchArray = [{ Note: SearchRgx }, { 'customers.CustomerName': SearchRgx }, { 'customers.Address': SearchRgx }, { 'customers.Phone': SearchRgx }, { 'customers.Email': SearchRgx }]
    let Result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage);
    res.status(200).json(Result)
}

exports.SaleDelete=async (req, res) => {
    let Result=await DeleteParentChildsService(req,ParentModel,ChildsModel,'SaleID')
    res.status(200).json(Result)
}

exports.SalesDetailsById=async (req, res) => {
    // let Result= await ChildsModel.find({SaleID:req.params.id}).populate('ProductID', 'Name')
    // res.status(200).json(Result)
    let Result=await DetailsByIDSaleService(req,ChildsModel)
    res.status(200).json(Result)
}