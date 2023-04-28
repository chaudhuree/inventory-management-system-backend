const mongoose = require("mongoose");
const DetailsByIDService = async (Request, DataModel) => {
    try {

        let DetailsID = Request.params.id;
        let UserEmail = Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {};
        QueryObject['_id'] = new ObjectId(DetailsID);
        QueryObject['UserEmail'] = UserEmail;

        // QueryObject={_id:new mongoose.Types.ObjectId(DetailsID),UserEmail:UserEmail}
        let data = await DataModel.aggregate([
            { $match: QueryObject }
        ])
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = DetailsByIDService