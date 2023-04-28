const ExpenseSummaryService = require("../../services/summary/ExpenseSummaryService");

exports.ExpensesSummary=async (req, res) => {
    let Result=await ExpenseSummaryService(req)
    res.status(200).json(Result)
}
