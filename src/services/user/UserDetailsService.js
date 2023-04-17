const UserDetailsService= async (Request,DataModel) => {
    try {
        let data = await DataModel.aggregate([{$match: {email:Request.headers['email']}}])
        // here data is an array of objects
        //or
        // let data = await DataModel.findOne({email:Request.headers['email']})
        // here data is an object
        return  {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=UserDetailsService