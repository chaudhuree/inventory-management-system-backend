const ParentModel = require("../../models/Purchases/PurchasesModel"); // ParentModel that mean for purchase the model is PurchasesModel. but for better understanding it is imported as ParentModel
const ChildsModel = require("../../models/Purchases/PurchaseProductsModel");
// like ParentModel, PurchaseProductsModel is imported as ChildsModel

// const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const CreateParentChildsServiceWithTransaction = require("../../services/common/CreateParentChildsServiceWithTransaction");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");


exports.CreatePurchases = async (req, res) => {
  let Result = await CreateParentChildsServiceWithTransaction(
    req,
    ParentModel,
    ChildsModel,
    "PurchaseID"
  );
  res.status(200).json(Result);
};

exports.PurchasesList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let JoinStage = {
    $lookup: {
      from: "suppliers",
      localField: "SupplierID",
      foreignField: "_id",
      as: "suppliers",
    },
  };
  let SearchArray = [
    { Note: SearchRgx },
    { "suppliers.Name": SearchRgx },
    { "suppliers.Address": SearchRgx },
    { "suppliers.Phone": SearchRgx },
    { "suppliers.Email": SearchRgx },
  ];
  // as here only join with supliersId so,ListOneJoinService(req,ParentModel,SearchArray,JoinStage) is enough
  let Result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );
  res.status(200).json(Result);
};


exports.PurchasesDelete=async (req, res) => {
  let Result=await  DeleteParentChildsService(req,ParentModel,ChildsModel,'PurchaseID')
  res.status(200).json(Result)
}