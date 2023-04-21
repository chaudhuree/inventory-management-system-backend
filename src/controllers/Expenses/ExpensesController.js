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


