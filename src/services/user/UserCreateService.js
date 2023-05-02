// Description: This file is used to create a new user
// here Request is the req in the controller function and Datamodel is mongodb model
const UserCreateService = async (Request, DataModel) => {
    try {
        let PostBody = Request.body;
        let data = await DataModel.create(PostBody)
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = UserCreateService