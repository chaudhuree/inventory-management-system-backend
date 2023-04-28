const ExpenseReportService = require("../../services/report/ExpenseReportService");
const PurchaseReportService = require("../../services/report/PurchaseReportService");

exports.ExpensesByDate=async (req, res) => {
    let Result=await ExpenseReportService(req)
    res.status(200).json(Result)
}

exports.PurchaseByDate=async (req, res) => {
    let Result=await PurchaseReportService(req)
    res.status(200).json(Result)
}