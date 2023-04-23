const DataModel = require("../../models/Expenses/ExpensesModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");


exports.CreateExpenses = async (req, res) => {
    let Result = await CreateService(req, DataModel);
    res.status(200).json(Result)
}

exports.UpdateExpenses = async (req, res) => {
    let Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}


exports.ExpensesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Note: SearchRgx }, { 'Type.Name': SearchRgx }]
    // in SearchArray we are not only searching by Note but also in Type.Name.
    // so we can search from expensetypes collection also.
    // as in the JoinStage it is named as Type so in SearchArray we are passing it
    // as Type.Name

    let JoinStage = { $lookup: { from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type" } }


    let Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
    res.status(200).json(Result)
}


