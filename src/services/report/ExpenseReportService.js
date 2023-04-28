const ExpensesModel = require("../../models/Expenses/ExpensesModel");
const ExpenseReportService = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];
        let FormDate = Request.body['FormDate']
        let ToDate = Request.body['ToDate']

        let data = await ExpensesModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) } } }, // array of expenses
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0, // this means group them all together
                            TotalAmount: { $sum: "$Amount" } // match operator er maddhome upor theke array of expense ashbe
                            // then sum korbe amount gulo total kora hoice
                        }
                    }],
                    Rows: [
                        { $lookup: { from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type" } }
                    ],
                    //  match kore first a array of expense gulo ashbe so jokhn lookup kora hoice then protita expense er moddhe expenseType gulo populate hoye jabe. so details pawa jabe.
                }
            }


        ])

        return { status: "success", data: data }

    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = ExpenseReportService

/*
const fromDate = new Date(FormDate);
const toDate = new Date(ToDate);

const totalCursor = await ExpensesModel.find({
    UserEmail: UserEmail,
    CreatedDate: { $gte: fromDate, $lte: toDate }
}).select('Amount -_id');

let totalAmount = 0;
await totalCursor.forEach(doc => {
    totalAmount += doc.Amount;
});

const rows = await ExpensesModel.find({
    UserEmail: UserEmail,
    CreatedDate: { $gte: fromDate, $lte: toDate }
}).populate('TypeID', 'Name -_id');


*/