// Description: This file is used to update the data in the database
const UpdateService= async (Request,DataModel) => {
    try{
        let UserEmail=Request.headers['email'];
        let id=Request.params.id; // id is the id of the data to be updated
        let PostBody=Request.body; // data will be in body which will be updated
        let data = await DataModel.updateOne({_id:id,UserEmail:UserEmail},PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService

