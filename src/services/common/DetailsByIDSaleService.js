const mongoose = require("mongoose");
const DetailsByIDSaleService = async (Request, DataModel) => {
  try {

    let DetailsID = Request.params.id;


    const ObjectId = mongoose.Types.ObjectId;
    let QueryObject = {};
    QueryObject['SaleID'] = new ObjectId(DetailsID);
    console.log(QueryObject);

    // QueryObject={_id:new mongoose.Types.ObjectId(DetailsID),UserEmail:UserEmail}
    let data = await DataModel.aggregate([
      { $match: QueryObject },
      {$lookup: { from: "products", localField: "ProductID", foreignField: "_id", as: "products" }},
      {$lookup: { from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands" }},
    ])
    return { status: "success from sales", data: data }
  }
  catch (error) {
    return { status: "fail", data: error }
  }
}
module.exports = DetailsByIDSaleService