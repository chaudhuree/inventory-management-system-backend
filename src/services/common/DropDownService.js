// This service is used to get the drop down data for the given model
// like, for category model, brand model it will provide dropdown data
const DropDownService = async (Request, DataModel, Projection) => {
    try {
        let UserEmail = Request.headers['email'];
        let data = await DataModel.aggregate([
            { $match: { UserEmail: UserEmail } },
            { $project: Projection }
        ])
        // or in pure mongoose
        // let data = await DataModel.find({UserEmail:UserEmail},Projection)
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = DropDownService