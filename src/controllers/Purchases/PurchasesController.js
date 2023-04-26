const ParentModel = require("../../models/Purchases/PurchasesModel"); // ParentModel that mean for purchase the model is PurchasesModel. but for better understanding it is imported as ParentModel
const ChildsModel = require("../../models/Purchases/PurchaseProductsModel");
// like ParentModel, PurchaseProductsModel is imported as ChildsModel


// const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const CreateParentChildsServiceWithTransaction = require("../../services/common/CreateParentChildsServiceWithTransaction");


exports.CreatePurchases = async (req, res) => {
    let Result = await CreateParentChildsServiceWithTransaction(req, ParentModel, ChildsModel, 'PurchaseID');
    res.status(200).json(Result)
}