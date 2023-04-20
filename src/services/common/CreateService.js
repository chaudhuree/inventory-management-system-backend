// this is a common service for creating data in database
const CreateService = async (Request, DataModel) => {
    try {

        let PostBody = Request.body; // data will be in body
        PostBody.UserEmail = Request.headers['email'] // email is always in the header to ensure multiuser support and make the seperate data entry by seperate users

        let data = await DataModel.create(PostBody)
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = CreateService