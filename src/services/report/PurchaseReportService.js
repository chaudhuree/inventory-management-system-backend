const PurchaseProductsModel = require("../../models/Purchases/PurchaseProductsModel");
const PurchasesReportService = async (Request) => {
    try {

        let UserEmail = Request.headers['email'];
        let FormDate = Request.body['FormDate']
        let ToDate = Request.body['ToDate']

        let data = await PurchaseProductsModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0, // run on the whole db.
                            TotalAmount: { $sum: "$Total" }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: "products", localField: "ProductID", foreignField: "_id", as: "products" } },
                        { $unwind: "$products" },
                        { $lookup: { from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands" } },
                        { $lookup: { from: "categories", localField: "products.CategoryID", foreignField: "_id", as: "categories" } }
                    ],
                    /*
                    $lookup: {from: "products", localField: "ProductID", foreignField: "_id", as: "products"}}
                    with these first populate with products
                    then,
                    {$unwind : "$products" } --> this will unwind the array of products
                    that means this will destructure the array of products and create separate documents for each product
                    then,
                    {$lookup: {from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands"}}
                    will populate the brand for each product
                    and finally,
                    {$lookup: {from: "categories", localField: "products.CategoryID", foreignField: "_id", as: "categories"}}
                    will populate the category for each product
                    */
                }
            }
        ])


        return { status: "success", data: data }

    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = PurchasesReportService