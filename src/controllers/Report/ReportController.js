const ExpenseReportService = require("../../services/report/ExpenseReportService");


exports.ExpensesByDate=async (req, res) => {
    let Result=await ExpenseReportService(req)
    res.status(200).json(Result)
}
