const UserUpdateService= async (Request,DataModel) => {
    try {
        // email is passed in the header
        let data = await DataModel.updateOne({email: Request.headers['email']}, Request.body)
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=UserUpdateService