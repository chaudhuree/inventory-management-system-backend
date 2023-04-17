// while login user we need to create a token for the user
// so we need to import the CreateToken function from utility folder
const CreateToken = require("../../utility/CreateToken");

const UserLoginService = async (Request, DataModel) => {
    try {
        let data = await DataModel.aggregate([{ $match: Request.body }, { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1 } }])
        // or
        // let data= await DataModel.find(Request.body,{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1})
        if (data.length > 0) {
            let token = await CreateToken(data[0]['email'])
            return { status: "success", token: token, data: data[0] }
        }
        else {
            return { status: "unauthorized" }
        }
    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports = UserLoginService